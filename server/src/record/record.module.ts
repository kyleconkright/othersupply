import { DiscogsService } from './../discogs/discogs.service';
import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordResolver } from './record.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UserModule, HttpModule],
  providers: [RecordResolver, RecordService, DiscogsService],
})
export class RecordModule {}
