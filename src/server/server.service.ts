import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateServerInputDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from 'src/member/member.type';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}
  async createServer(
    createServerInput: CreateServerInputDto,
    imageUrl: string,
  ) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: createServerInput.profileId,
      },
    });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    return this.prisma.server.create({
      data: {
        ...createServerInput,
        imageUrl,
        inviteCode: uuidv4(),
        Channels: {
          create: [
            {
              name: 'General',
              profileId: profile.id,
            },
          ],
        },
        Members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
      include: {
        Members: true,
      },
    });
  }

  async getServer(serverId: number, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile) {
      throw new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');
    }
    const server = await this.prisma.server.findFirst({
      where: {
        id: serverId,
        Members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });
    if (!server) {
      throw new ApolloError('Server not found', 'SERVER_NOT_FOUND');
    }
    return server;
  }

  async getServersByProfileEmailOfMember(email: string) {
    return this.prisma.server.findMany({
      where: {
        Members: {
          some: {
            profile: {
              email,
            },
          },
        },
      },
    });
  }
}
