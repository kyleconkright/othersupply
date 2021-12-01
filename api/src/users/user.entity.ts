import { Record } from './../records/record.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @OneToMany(_type => Record, record => record.user, {eager: true})
  records: Record[];
}