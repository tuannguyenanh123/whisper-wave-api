import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(createProfileDto: CreateProfileDto) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email: createProfileDto.email,
      },
    });

    if (profile) return profile;

    return await this.prisma.profile.create({
      data: createProfileDto,
    });
  }

  async getProfileById(id: number) {
    return await this.prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        Servers: {
          include: {
            Channels: true,
          },
        },
      },
    });
  }

  async getProfileByEmail(email: string) {
    return await this.prisma.profile.findUnique({
      where: {
        email,
      },
      include: {
        Servers: {
          include: {
            Channels: true,
          },
        },
      },
    });
  }
}
