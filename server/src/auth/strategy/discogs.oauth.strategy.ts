import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../jwt-payload';
import { User } from 'src/user/entities/user.entity';
import { Strategy } from 'passport-oauth1';
import { JwtService } from '@nestjs/jwt';
import { catchError, firstValueFrom, from, of, pluck } from 'rxjs';
import { Discogs } from 'src/discogs/entities/discog.entity';

@Injectable()
export class DiscogsOAuthStrategy extends PassportStrategy(
  Strategy,
  'discogs',
) {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    @InjectRepository(Discogs)
    private discogsRepository: Repository<Discogs>,
    private configService: ConfigService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {
    super({
      requestTokenURL: configService.get('DISCOGS_REQUEST_TOKEN_URL'),
      accessTokenURL: configService.get('DISCOGS_ACCESS_TOKEN_URL'),
      userAuthorizationURL: configService.get('DISCOGS_USER_AUTHORIZATION_URL'),
      consumerKey: configService.get('DISCOGS_KEY'),
      consumerSecret: configService.get('DISCOGS_SECRET'),
      callbackURL: configService.get('DISCOGS_AUTH_CALLBACK_URL'),
      passReqToCallback: true,
    });
  }

  async validate(req, token, tokenSecret): Promise<User> {
    const params = {
      oauth_consumer_key: process.env.DISCOGS_KEY,
      oauth_signature_method: 'PLAINTEXT',
      oauth_timestamp: Date.now(),
      oauth_nonce: Date.now(),
      oauth_version: '1.0',
    };

    console.log({ token, tokenSecret });

    const url = `https://api.discogs.com/oauth/identity?oauth_token=${token}&oauth_signature=${process.env.DISCOGS_SECRET}%26${tokenSecret}`;

    const data = await firstValueFrom(
      this.httpService.get(url, { params }).pipe(pluck('data')),
    );

    const { resource_url, id, username: discogs_username } = data;

    const cookie = req.cookies[process.env.AUTH_COOKIE];
    const { username } = await this.jwtService.verifyAsync(cookie);
    const user: User = await this.authRepository.findOne({
      where: { username },
      relations: ['discogs'],
    });

    if (user.discogs) {
      // Update Discogs Info
      user.discogs.discogs_id = id;
      user.discogs.discogs_oauth_token = token;
      user.discogs.discogs_oauth_token_secret = tokenSecret;
      user.discogs.discogs_resource_url = resource_url;
      user.discogs.discogs_username = discogs_username;
    } else {
      // Add Discogs Info
      const discogs = this.discogsRepository.create({
        discogs_id: id,
        discogs_oauth_token: token,
        discogs_oauth_token_secret: tokenSecret,
        discogs_resource_url: resource_url,
        discogs_username: discogs_username,
      });

      user.discogs = discogs;
    }

    await this.authRepository.save(user);

    return user;
  }
}
