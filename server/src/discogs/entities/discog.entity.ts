import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'discogs' })
export class Discogs {
  @Field((type) => ID)
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field((type) => User)
  @OneToOne((_type) => User)
  @JoinColumn()
  user: User;

  @Field()
  @Column({ nullable: true })
  discogs_id: string;

  @Field()
  @Column({ nullable: true })
  discogs_username: string;

  @Field()
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  discogs_oauth_token: string;

  @Field()
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  discogs_oauth_token_secret: string;

  @Field()
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  discogs_resource_url: string;
}
