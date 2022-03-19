import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { JwtPayload } from './jwt-payload';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUser(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  }

  async createUser(createUserInput: CreateUserInput): Promise<JwtPayload> {
    const { username, password: tmp } = createUserInput;

    console.log({ username, tmp });

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(tmp, salt);

    const user = await this.userRepository.save({ username, password });

    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken, username: user.username };
  }

  async loginUser(createUserInput: CreateUserInput): Promise<JwtPayload> {
    const { username, password } = createUserInput;
    const user = await this.getUser(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken, username: user.username };
    } else {
      throw new UnauthorizedException('Check Credentials');
    }
  }

  async connectDiscogs(user) {
    return `connect discogs ${user}`;
  }

  async verify(cookie) {
    return this.jwtService.verifyAsync(cookie);
  }
}
