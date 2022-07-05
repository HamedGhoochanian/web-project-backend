import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SignupReqDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  cellphone: string;
  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}
