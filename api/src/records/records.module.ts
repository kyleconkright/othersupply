import { AuthModule } from './../auth/auth.module';
import { RecordsRepository } from './records.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { RecordsResolver } from './records.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecordsRepository]),
    AuthModule
  ],
  controllers: [RecordsController],
  providers: [RecordsResolver, RecordsService]
})
export class RecordsModule {}
