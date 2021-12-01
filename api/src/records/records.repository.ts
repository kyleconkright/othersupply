import { GetRecordFilterDto } from './dto/get-record-filter.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { EntityRepository, Repository } from "typeorm";
import { Record } from './record.entity';
import { User } from 'src/users/user.entity';

@EntityRepository(Record)
export class RecordsRepository extends Repository<Record> {

  async getRecords(filterDto: GetRecordFilterDto): Promise<Record[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('record');
    // query.where({user});

    if (search) {
      query.andWhere('(LOWER(record.title) LIKE LOWER(:search) OR LOWER(record.source) LIKE LOWER(:search))', {search: `%${search}%`})
    }

    const records = await query.getMany();
    return records;
  }
  
  async createRecord(createRecordDto: CreateRecordDto, user: User) {
    const { title, source, image_src, url } = createRecordDto;

    const body = {
      title,
      source,
      image_src,
      url,
      user
    }

    const record = this.create(body);

    await this.save(record);
    return record;
  }
}
