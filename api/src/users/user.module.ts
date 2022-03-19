import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './user.repositotry';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';


@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      UserRepository
    ]),
    AuthModule,
  ],
  providers: [UserResolver, UserService]
})
export class UserModule {}
