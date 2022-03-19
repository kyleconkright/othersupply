import { DiscogsService } from './../discogs/discogs.service';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecordService } from './record.service';
import { Record } from './entities/record.entity';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { GetUser, GqlUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-authguard';
import { map } from 'rxjs/operators';

@Resolver(() => Record)
export class RecordResolver {
  constructor(
    private readonly recordService: RecordService,
    private discogsService: DiscogsService,
  ) {}

  @Mutation(() => Record)
  @UseGuards(GqlAuthGuard)
  createRecord(
    @Args('createRecordInput') createRecordInput: CreateRecordInput,
    @GqlUser() user: User,
  ) {
    return this.recordService.create(createRecordInput, user);
  }

  @Mutation(() => Record)
  @UseGuards(GqlAuthGuard)
  addToWantList(@Args('id') id: string, @GqlUser() user: User) {
    const record = this.discogsService.addToWantList(+id, user).pipe(
      map((record) => ({
        id: record.id,
        title: record.basic_information.title,
        artist: record.basic_information.artists[0].name,
      })),
    );
    return record;
  }

  @Query(() => [Record], { name: 'records' })
  findAll() {
    return this.recordService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Record], { name: 'syncWantList' })
  syncWantList(@GqlUser() user: User) {
    return this.recordService.syncWantList(user);
  }

  @Query(() => Record, { name: 'record' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.recordService.findOne(id);
  }

  @Mutation(() => Record)
  updateRecord(
    @Args('updateRecordInput') updateRecordInput: UpdateRecordInput,
  ) {
    return this.recordService.update(updateRecordInput);
  }

  @Mutation(() => Record)
  @UseGuards(GqlAuthGuard)
  async removeRecord(@Args('id', { type: () => String }) id: string) {
    await this.recordService.remove(id);
    return { id };
  }
}
