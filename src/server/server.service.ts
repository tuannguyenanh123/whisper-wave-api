import { Injectable } from '@nestjs/common';
import { CreateServerInput } from './dto/create-server.input';
import { UpdateServerInput } from './dto/update-server.input';

@Injectable()
export class ServerService {
  create(createServerInput: CreateServerInput) {
    return 'This action adds a new server';
  }

  findAll() {
    return `This action returns all server`;
  }

  findOne(id: number) {
    return `This action returns a #${id} server`;
  }

  update(id: number, updateServerInput: UpdateServerInput) {
    return `This action updates a #${id} server`;
  }

  remove(id: number) {
    return `This action removes a #${id} server`;
  }
}
