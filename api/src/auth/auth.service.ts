import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({username});
    
    if(user &&(await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {username};
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your Login Credentials')
    }
  }
}
