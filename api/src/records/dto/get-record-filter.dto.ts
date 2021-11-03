import { IsOptional, IsString } from "class-validator";

export class GetRecordFilterDto {
  @IsOptional()
  @IsString()
  title: string;
  
  @IsOptional()
  @IsString()
  source: string;
  
  @IsOptional()
  @IsString()
  search: string;
}