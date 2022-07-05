import { PageDto } from '../../../dto/page.dto';
import { IsMongoId, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductListDto extends PageDto {
  @ApiPropertyOptional()
  @IsMongoId({ message: 'Invalid category id' })
  @IsOptional()
  category: string;
}
