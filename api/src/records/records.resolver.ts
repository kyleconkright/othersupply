import { Resolver, Query, Args } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { Record } from "./record.entity";

@Resolver(of => Record) 
export class RecordsResolver {
  constructor(
    private readonly recordsService: RecordsService,
  ) {}
  
  @Query(returns => [Record])
  async records(): Promise<Record[]> {
    const records = await this.recordsService.getRecords();
    if(!records) {
      throw new NotFoundException();
    }
    return records;
  }
  
  @Query(returns => Record)
  async record(
    @Args('id') id: string
  ): Promise<Record> {
    const posts = await this.recordsService.getRecord(id);
    if(!posts) {
      throw new NotFoundException();
    }
    return posts;
  }
}
