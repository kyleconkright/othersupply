import { map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { Record } from './entities/record.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
    private userService: UserService,
    private httpService: HttpService,
  ) {}

  create(createRecordInput: CreateRecordInput, user: User) {
    return this.recordRepository.save({ ...createRecordInput, users: [user] });
  }

  async syncWantList(user) {
    console.log(user);
    const records = await firstValueFrom(
      this.httpService.get(`${user.discogs.discogs_resource_url}/wants`).pipe(
        // tap((res) =>
        //   console.log(res.data.wants[0].basic_information.formats[0]),
        // ),
        map((res) =>
          res.data.wants.map((want) => ({
            artist: want.basic_information.artists[0].name,
            title: want.basic_information.title,
            discogs_id: want.id,
            image_src: want.basic_information.cover_image,
            source: 'discogs',
            url: `https://www.discogs.com/release/${want.id}`,
            users: [user],
          })),
        ),
      ),
    );

    // let results;

    // try {
    //   results = await await this.recordRepository.upsert(records, [
    //     'discogs_id',
    //   ]);
    // } catch (e) {
    //   console.error(e);
    // }

    // const posts = await this.recordRepository
    //   .createQueryBuilder('record')
    //   .insert()
    //   .into(Record)
    //   .values(records)
    //   .orUpdate(
    //     ['artist', 'title', 'source', 'image_src', 'url'],
    //     ['discogs_id'],
    //   )
    //   .returning('*')
    //   .execute();

    // console.log(
    //   posts.raw.find(
    //     (record) => record.id === 'd79748fd-dd06-4f38-96d6-34a71f4fc469',
    //   ),
    // );

    const record = await this.recordRepository
      .createQueryBuilder()
      .insert()
      .into(Record)
      .values({
        title: 'hi',
        artist: 'hello',
        source: 'discogs',
        image_src: 'string',
        url: 'url',
      })
      .execute();

    const newUser = await this.userService.findOne(user.id);

    await this.recordRepository
      .createQueryBuilder()
      .relation(Record, 'users')
      .of('5ee797d4-a402-48b3-ad95-394c333f2d87')
      .add(newUser.id);

    // const test = await this.recordRepository
    //   .createQueryBuilder('record')
    //   .relation(Record, 'users')
    //   .of(records)
    //   .loadMany();

    // console.log(test);

    const relations = await this.recordRepository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.users', 'users')
      .where('users.id = :id', { id: user.id })
      .getMany();

    return relations;
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
