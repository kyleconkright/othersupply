import { Record } from './../records/record.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({description: 'user'})
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({unique: true})
  username: string;

  @Field()
  @Column()
  password: string;

  @Field(type => [Record])
  @OneToMany(_type => Record, record => record.user, {eager: true})
  records: Record[];
}