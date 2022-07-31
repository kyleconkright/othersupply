import { DiscogsInterceptor } from './discogs.interceptor';
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { DiscogsService } from './discogs.service';
import { DiscogsController } from './discogs.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [HttpModule],
  controllers: [DiscogsController],
  providers: [
    DiscogsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DiscogsInterceptor,
    },
  ],
  exports: [DiscogsService],
})
export class DiscogsModule {}
