import { Module } from '@nestjs/common';
import {
  Category,
  categorySchema,
  Product,
  productsSchema,
} from '../../schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ProductsService } from './products.service';
import { ProductsAdminController } from './controllers/admin.controller';
import { ProductsPublicController } from './controllers/public.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: productsSchema },
      { name: Category.name, schema: categorySchema },
    ]),
    AuthModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsAdminController, ProductsPublicController],
})
export class ProductsModule {}
