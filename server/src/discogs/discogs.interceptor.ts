import { User } from 'src/user/entities/user.entity';
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class DiscogsInterceptor implements NestInterceptor {
  constructor(private httpService: HttpService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const { user }: { user: User } = ctx.getContext().req;

    if (user && user.discogs) {
      this.httpService.axiosRef.defaults.headers.common['user-agent'] =
        'other_supply2.0';
      this.httpService.axiosRef.defaults.headers.common[
        'Authorization'
      ] = `OAuth oauth_consumer_key="${process.env.DISCOGS_KEY}",\
    oauth_token="${user.discogs.discogs_oauth_token}",\
    oauth_signature_method="PLAINTEXT",\
    oauth_timestamp="1657692070",\
    oauth_nonce="UBHZGvdxDKn",\
    oauth_version="1.0",\
    oauth_signature="${process.env.DISCOGS_SECRET}%26${user.discogs.discogs_oauth_token_secret}"`;
    }
    return next.handle().pipe();
  }
}
