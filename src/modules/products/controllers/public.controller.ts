import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { ProductListDto } from '../dto/product-list.dto';
import { NoAuth } from '../../auth/no-auth.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
@NoAuth()
export class ProductsPublicController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(@Query() query: ProductListDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
