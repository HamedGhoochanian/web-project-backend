import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: '09152015593',
  })
  readonly username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
    example: '09359106955',
    description: 'رمز عبور',
  })
  readonly password: string;
}
