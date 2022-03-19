import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { username, password: tmp } = createUserInput;

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(tmp, salt);

    return this.userRepository.save({ username, password });
  }

  async signIn(createUserInput: CreateUserInput): Promise<User> {
    const { username, password: tmp } = createUserInput;

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(tmp, salt);

    return this.userRepository.save({ username, password });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['records'],
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
