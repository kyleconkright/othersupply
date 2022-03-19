import { map, Observable, tap } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
    private httpService: HttpService,
  ) {
    console.log('RECORD SERVICE');
  }

  create(createRecordInput: CreateRecordInput, user: User) {
    return this.recordRepository.save({ ...createRecordInput, users: [user] });
  }

  syncWantList(user) {
    return this.httpService
      .get(`${user.discogs.discogs_resource_url}/wants`)
      .pipe(
        tap((res) => console.log(res.data.wants[0])),
        map((res) =>
          res.data.wants.map((want) => ({
            artist: want.basic_information.artists[0].name,
            title: want.basic_information.title,
            discogs_id: want.id,
          })),
        ),
      );
  }

  findAll() {
    return this.recordRepository.find({ relations: ['users'] });
  }

  findOne(id: string) {
    return this.recordRepository.findOne({
      where: { id },
      relations: ['users', 'users.records'],
    });
  }

  update(updateRecordInput: UpdateRecordInput) {
    return this.recordRepository.save({ ...updateRecordInput });
  }

  remove(id: string) {
    return this.recordRepository.delete({ id });
  }
}
