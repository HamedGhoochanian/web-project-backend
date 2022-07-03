import { GoogleRecaptchaFilter } from './google-recaptcha-filter.exception';
import {
  Body,
  Controller,
  Post,
  SetMetadata,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './dto/login-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SetMetadata('auth', false)
  @UseGuards(GoogleRecaptchaGuard)
  @UseFilters(new GoogleRecaptchaFilter())
  @ApiOperation({})
  @ApiResponse({ status: 201, isArray: false, type: LoginResponse })
  async login(@Body() payload: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(payload);
  }
}
