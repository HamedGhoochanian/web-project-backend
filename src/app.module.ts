import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

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
  ],
})
export class AppModule {}
