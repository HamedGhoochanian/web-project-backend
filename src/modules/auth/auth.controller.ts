import { Body, Controller, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './dto/login-response.dto';
import { SignupReqDto } from './dto/signupReq.dto';
import { SignupResDto } from './dto/signupRes.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SetMetadata('auth', false)
  @ApiOperation({})
  @ApiResponse({ status: 201, isArray: false, type: LoginResponse })
  async login(@Body() payload: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(payload);
  }

  @Post('signup')
  @SetMetadata('auth', false)
  @ApiOperation({})
  @ApiResponse({ type: SignupResDto })
  async signup(@Body() body: SignupReqDto) {
    return this.authService.signup(body);
  }
}
