import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { Server } from './types';
import { Request } from 'express';
import { Injectable, UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { ApolloError } from 'apollo-server-express';
import { ServerService } from './server.service';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { uuid as uuidv4 } from 'uuidv4';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { CreateServerInputDto } from './dto';

@Injectable()
@UseGuards(GraphqlAuthGuard)
@Resolver()
export class ServerResolver {
  constructor(private readonly serverServer: ServerService) {}

  @Query(() => [Server])
  async getServers(@Context() ctx: { req: Request }) {
    if (!ctx.req?.profile.email)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');
    return this.serverServer.getServersByProfileEmailOfMember(
      ctx.req?.profile.email,
    );
  }

  // @Query(() => [Server])
  // async getServers(@Context() ctx: { req: Request }) {
  //   // if (!ctx.req?.profile.email)
  //   //   return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');
  //   return this.serverServer.getServersByProfileEmailOfMember(
  //     'anhtuan120600ohayo@gmail.com', // fake vì call ko đc
  //   );
  // }

  @Mutation(() => Server)
  async createServer(
    @Args('createServerInput') createServerInput: CreateServerInputDto,
    @Args('file', {
      type: () => GraphQLUpload,
      nullable: true,
    })
    file: GraphQLUpload,
  ) {
    if (!file) throw new ApolloError('Image is required', 'IMAGE_REQUIRED');
    const imageUrl = await this.storeImageAndGetUrl(file);
    return this.serverServer.createServer(createServerInput, imageUrl);
  }

  private async storeImageAndGetUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', 'images', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/images/${uniqueFilename}`;

    if (!existsSync(join(process.cwd(), 'public', 'images'))) {
      mkdirSync(join(process.cwd(), 'public', 'images'), { recursive: true });
    }
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));
    return imageUrl;
  }
}
