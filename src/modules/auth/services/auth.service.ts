import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../../common/utils';
import { UserNotFoundException } from '../../../exceptions';
import { Unauthorized } from '../../../exceptions/unauthorized.exception';
import type { IJwtClaims } from '../../../interfaces/IJwtClaims';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { UserService } from '../../user/services/user.service';
import type { LoginDto } from '../dtos/login.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly apiConfigService: ApiConfigService,
  ) {}

  /**
   * Generate accessToken from payload, it include id & role of the user
   * @param payload
   * @returns accessToken with type is string
   */
  generateAccessToken(payload: IJwtClaims): string {
    return this.jwtService.sign(payload, {
      secret: this.apiConfigService.authConfig.accessTokenPrivateKey,
      expiresIn: this.apiConfigService.authConfig.accessTokenExpirationTime,
    });
  }

  /**
   * Validate Admin by email and password
   * @param credential
   * @returns LoginResponseDto
   */
  async validateAdminSignIn(credential: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = credential;
    const user = await this.userService.findOneByFilterOptions({ email });

    if (!user) {
      throw new UserNotFoundException('Admin not found');
    }

    const isPasswordValid = await validateHash(password, user.password);

    if (!isPasswordValid) {
      throw new Unauthorized('Invalid credentials');
    }

    const payload: IJwtClaims = {
      id: user.id,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(payload);

    return new LoginResponseDto(user, accessToken);
  }
}
