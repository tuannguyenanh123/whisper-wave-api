import { CreateServerInput } from './create-server.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServerInput extends PartialType(CreateServerInput) {
  @Field(() => Int)
  id: number;
}
