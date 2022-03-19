import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { UpdateDiscogDto } from './dto/update-discog.dto';
import { User } from 'src/user/entities/user.entity';
import { AxiosInstance, AxiosResponse } from 'axios';

export interface OtherRequest extends Express.Request {
  user: User;
}

@Injectable()
export class DiscogsService {
  constructor(private httpService: HttpService) {}

  pullWantList(req: OtherRequest): Observable<any> {
    return this.httpService
      .get(`${req.user.discogs.discogs_resource_url}/wants`)
      .pipe(pluck('data'));
  }

  addToWantList(id: number, user: User): Observable<any> {
    const request = {
      url: `${user.discogs.discogs_resource_url}/wants/${id}`,
    };

    return this.httpService.put(request.url).pipe(pluck('data'));
  }

  findOne(id: number) {
    return `This action returns a listing #${id} from discogs wantlist`;
  }

  update(id: number, updateDiscogDto: UpdateDiscogDto) {
    return `This action updates a #${id} discog`;
  }

  remove(id: number) {
    return `This action removes a #${id} discog`;
  }
}
