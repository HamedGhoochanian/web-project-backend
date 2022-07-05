import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.AUTH_SECRET_KEY,
      signOptions: { expiresIn: Number(process.env.AUTH_EXPIRE_IN) },
    }),
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}
