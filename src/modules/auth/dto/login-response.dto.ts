import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginResponse {
  @ApiProperty()
  @Expose()
  readonly user: {
    _id: string;
    name: string;
    cellphone: string;
    roles: string[];
  };
  @ApiProperty()
  @Expose()
  readonly token: string;
}
