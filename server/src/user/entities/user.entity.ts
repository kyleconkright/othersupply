import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Discogs } from 'src/discogs/entities/discog.entity';
import { Record } from 'src/record/entities/record.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'user' })
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Field((type) => [Record])
  @ManyToMany((_type) => Record, (record) => record.users)
  @JoinTable()
  records: Record[];

  @Field((type) => Discogs)
  @OneToOne((_type) => Discogs, (discogs) => discogs.user)
  @JoinColumn()
  discogs: Discogs | null;
}
