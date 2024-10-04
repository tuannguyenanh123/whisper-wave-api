import { Test, TestingModule } from '@nestjs/testing';
import { ServerResolver } from './server.resolver';
import { ServerService } from './server.service';

describe('ServerResolver', () => {
  let resolver: ServerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerResolver, ServerService],
    }).compile();

    resolver = module.get<ServerResolver>(ServerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
