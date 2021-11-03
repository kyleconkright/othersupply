import { User } from './../auth/user.entity';
import { Record } from './record.entity';
import { RecordsRepository } from './records.repository';
import { GetRecordFilterDto } from './dto/get-record-filter.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(RecordsRepository)
    private recordsRepository: RecordsRepository
  ) { }

  async getRecords(filterDto: GetRecordFilterDto, user: User): Promise<Record[]> {
    return await this.recordsRepository.getRecords(filterDto, user);
  }

  async getRecord(id: string, user: User): Promise<Record> {
    const record = await this.recordsRepository.findOne({id, user});
    if (!record) throw new NotFoundException(`Record with id ${id} not found.`);
    return record;
  }

  async deleteRecord(id: string, user: User): Promise<void> {
    const res = await this.recordsRepository.delete({id, user});
    if(res.affected === 0) throw new NotFoundException(`${id} not found`);
  }

  createRecord(createRecordDto: CreateRecordDto, user: User): Promise<Record> {
   return this.recordsRepository.createRecord(createRecordDto, user);
  }

  async updateRecord(id: string, body: {}, user): Promise<Record> {
    const record = await this.getRecord(id, user);
    const updatedRecord = { ...record, ...body };
    await this.recordsRepository.save(updatedRecord);
    return updatedRecord
  }
}