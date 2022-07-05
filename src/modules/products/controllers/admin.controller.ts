import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('products')
@ApiTags('products')
@ApiSecurity('JWT auth')
@UseGuards(JwtAuthGuard)
export class ProductsAdminController {
  @Inject() private readonly productsService: ProductsService;

  @Post()
  @ApiOperation({ summary: 'Create product' })
  create(@Body() payload: CreateProductDto): any {
    return this.productsService.create(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  delete(@Param('id') id: string): any {
    return this.productsService.delete(id);
  }
}
