import { DiscogsInterceptor } from './discogs.interceptor';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { catchError } from 'rxjs';
import { DiscogsService, OtherRequest } from './discogs.service';
import { UpdateDiscogDto } from './dto/update-discog.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(DiscogsInterceptor)
@Controller('discogs')
export class DiscogsController {
  constructor(private readonly discogsService: DiscogsService) {}

  @Get('wantlist')
  pullWantList(@Req() req: OtherRequest) {
    return this.discogsService.pullWantList(req);
  }

  @Get('wantlist/:id')
  findOne(@Param('id') id: string) {
    return this.discogsService.findOne(+id);
  }

  @Put('wantlist/:id')
  addToWantList(@Param('id') id: string, @Req() req: OtherRequest) {
    const result = this.discogsService.addToWantList(+id, req.user);
    result
      .pipe(
        catchError((err) => {
          return err;
        }),
      )
      .subscribe();
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscogDto: UpdateDiscogDto) {
    return this.discogsService.update(+id, updateDiscogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discogsService.remove(+id);
  }
}
