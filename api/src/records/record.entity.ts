import { Exclude } from 'class-transformer';
import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ description: 'record' })
export class Record {
	@Field((type) => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@Column()
	title: string;

	@Field()
	@Column()
	source: string;

	@Field()
	@Column()
	image_src: string;

	@Field()
	@Column()
	url: string;

	// @Column()
	// price: number;

	@Field((type) => User)
	@ManyToOne((_type) => User, (user) => user.records)
	@Exclude({ toPlainOnly: true })
	user: User;
}
