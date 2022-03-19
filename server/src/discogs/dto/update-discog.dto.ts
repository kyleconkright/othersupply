import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscogDto } from './create-discog.dto';

export class UpdateDiscogDto extends PartialType(CreateDiscogDto) {}
