import { Injectable, UnauthorizedException } from '@nestjs/common';
import {LoginDto, RefreshTokenDto} from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private JWTService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    const payload = { username: user.email, sub: { username: user.username } };

    return {
      userData: user,
      backendTokens: {
        accessToken: await this.JWTService.signAsync(payload, {
          expiresIn: '1h',
          secret: this.configService.get<string>('JWT.JWT_SECRET_KEY'),
        }),
        refreshToken: await this.JWTService.signAsync(payload, {
          expiresIn: '7d',
          secret: this.configService.get<string>('JWT.JWT_REFRESH_TOKEN_KEY'),
        }),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByLogin(dto.login);

    if (user && (await compare(dto.password, user.password))) {
      return user;
    }

    throw new UnauthorizedException(
      'Login or password is invalid',
    ).getResponse();
  }

  async refreshToken(user: RefreshTokenDto) {
    const payload = { username: user.username, sub: user.sub };

    return {
      accessToken: await this.JWTService.signAsync(payload, {
        expiresIn: '1h',
        secret: this.configService.get<string>('JWT.JWT_SECRET_KEY'),
      }),
      refreshToken: await this.JWTService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT.JWT_REFRESH_TOKEN_KEY'),
      }),
    };
  }
}
