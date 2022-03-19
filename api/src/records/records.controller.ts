import { GetRecordFilterDto } from './dto/get-record-filter.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

// import { Record } from './record.model';
import { RecordsService } from './records.service';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './record.entity';
import { User } from 'src/users/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('records')
// @UseGuards(AuthGuard())
export class RecordsController {
  constructor(private recordsService: RecordsService) { }

  @Get()
  getRecords(
    @Query() filterDto: GetRecordFilterDto,
    // @GetUser() user: User
  ): Promise<Record[]> {
    return this.recordsService.getRecords(filterDto);
  }
  
  // @Get('/:id')
  // getRecord(
  //   @Param('id') id: string,
  //   @GetUser() user: User
  // ): Promise<Record> {
  //   return this.recordsService.getRecord(id, user)
  // }
 
  @Delete('/:id')
  deleteRecord(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<void> {
    return this.recordsService.deleteRecord(id, user);
  }

  @Post()
  createRecord(
    @Body() createRecordDto: CreateRecordDto,
    @GetUser() user: User
  ): Promise<Record> {
    return this.recordsService.createRecord(createRecordDto, user)
  }
  
  @Patch('/:id')
  updateRecord(
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto,
    @GetUser() user: User
  ): Promise<Record> {
    return this.recordsService.updateRecord(id, updateRecordDto, user)
  }
}
