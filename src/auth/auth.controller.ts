import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './decorator/public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtRefreshTokenGuard } from './guard/jwt-refresh-token.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth('JWT')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('invalidate-token')
  async invalidateToken(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')[1];
    await this.authService.invalidateToken(token);
    return { message: 'Token invalidated successfully' };
  }
}
