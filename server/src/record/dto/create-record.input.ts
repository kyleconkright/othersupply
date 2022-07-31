import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRecordInput {
  @Field()
  title: string;

  @Field()
  source: 'discogs';

  @Field()
  image_src: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  price: number;
}
