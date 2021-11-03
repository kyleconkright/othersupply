import { IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateRecordDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  source: string;

  image_src: string;

  
  @IsNotEmpty()
  url: string;

  // @IsOptional()
  // @IsNumber({maxDecimalPlaces: 2})
  // price: number;
}