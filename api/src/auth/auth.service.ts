import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRepository } from './auth.repository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string, username: string}> {
    const { username, password } = authCredentialsDto;
    const user = await this.authRepository.createUser({ username, password });
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return ({accessToken, username: user.username})
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string, username: string}> {
    const { username, password } = authCredentialsDto;
    const user = await this.authRepository.findOne({username});
    
    if(user &&(await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {username};
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken, username };
    } else {
      throw new UnauthorizedException('Please check your Login Credentials')
    }
  }
}
