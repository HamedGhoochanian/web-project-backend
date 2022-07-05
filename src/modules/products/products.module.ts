import { Module } from '@nestjs/common';
import {
  Category,
  categorySchema,
  Product,
  productsSchema,
} from '../../schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: productsSchema },
      { name: Category.name, schema: categorySchema },
    ]),
    AuthModule,
  ],
})
export class ProductsModule {}
