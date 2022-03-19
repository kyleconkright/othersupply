import { CreateRecordInput } from './create-record.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRecordInput extends PartialType(CreateRecordInput) {
  @Field(() => ID)
  id: string;
}
