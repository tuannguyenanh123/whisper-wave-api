import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerResolver } from './server.resolver';

@Module({
  providers: [ServerResolver, ServerService],
})
export class ServerModule {}
