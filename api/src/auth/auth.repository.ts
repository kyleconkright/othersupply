import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password: tmp} = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(tmp, salt);

    const user = this.create({ username, password });
    try {
      await this.save(user);
      return user;
    } catch (error) {
      if(error.code === "23505") {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}