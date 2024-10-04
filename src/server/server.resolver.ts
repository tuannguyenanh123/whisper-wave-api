import { Resolver, Query } from '@nestjs/graphql';
import { Server } from './entities/server.entity';

@Resolver(() => Server)
export class ServerResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
}
