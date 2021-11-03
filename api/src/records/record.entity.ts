import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  source: string;
  
  @Column()
  image_src: string;
  
  @Column()
  url: string;

  // @Column()
  // price: number;
  
  @ManyToOne(_type => User, user => user.records, {eager: false})
  @Exclude({toPlainOnly: true})
  user: User;
  
}