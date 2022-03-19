import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscogsModule } from './../discogs/discogs.module';
import { DiscogsOAuthStrategy } from './strategy/discogs.oauth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { Discogs } from 'src/discogs/entities/discog.entity';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: true}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
            expiresIn: 3600,
          }
        })
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Discogs]),
    DiscogsModule
  ],
  providers: [AuthService, JwtStrategy, DiscogsOAuthStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, DiscogsOAuthStrategy, PassportModule]
})
export class AuthModule {}
