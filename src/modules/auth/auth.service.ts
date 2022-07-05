import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRole } from '../../schemas';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { INVALID_CREDENTIALS } from './messages';
import { plainToInstance } from 'class-transformer';
import { LoginResponse } from './dto/login-response.dto';
import { JwtPayload } from './dto/jwt-payload.interface';
import { genSaltSync, hashSync } from 'bcryptjs';
import { SignupResDto } from './dto/signupRes.dto';

@Injectable()
export class AuthService {
  @Inject() private jwtService: JwtService;
  @InjectModel(User.name) private userModel: Model<UserDocument>;
  async login(loginPayload: LoginDto) {
    const user = await this.userModel.findOne({
      cellphone: loginPayload.username,
      active: true,
    });

    if (!user) {
      throw new BadRequestException(INVALID_CREDENTIALS);
    }

    const isValid = hashSync(loginPayload.password, user.passwordHash);
    if (!isValid) {
      throw new BadRequestException(INVALID_CREDENTIALS);
    }

    const token = this.generateToken(user);

    const responsePayload = {
      token,
      user: {
        _id: user._id,
        name: user.name,
        cellphone: user.cellphone,
        roles: user.roles,
      },
    };
    return plainToInstance(LoginResponse, responsePayload);
  }

  public async signup(payload) {
    const salt = genSaltSync(parseInt(process.env.SALT, 10));
    const passwordHash = hashSync(payload.password, salt);
    const createdUser = await new this.userModel({
      passwordHash,
      name: payload.name,
      cellphone: payload.cellphone,
      roles: [UserRole.User],
    }).save();
    const jwt = this.generateToken(createdUser);
    return plainToInstance(
      SignupResDto,
      { jwt },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  generateToken(user: User): string {
    const jwtPayload: JwtPayload = {
      _id: user._id,
      cellphone: user.cellphone,
      name: user.name,
    };
    return this.jwtService.sign(jwtPayload);
  }
}
