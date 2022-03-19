import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@Entity()
@ObjectType({ description: 'record' })
export class Record {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string;

  @Column({ nullable: true })
  @Field()
  discogs_id: string;

  @Column({ nullable: true })
  @Field()
  artist: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  source: string;

  @Column()
  @Field()
  image_src: string;

  @Column()
  @Field()
  url: string;

  @Column({ nullable: true })
  @Field()
  price: number;

  @ManyToMany((_type) => User, (user) => user.records, { eager: false })
  @JoinTable()
  @Field((type) => [User])
  users: User[];
}
