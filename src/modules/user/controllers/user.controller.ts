import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ROLE_TYPE } from '../../../constants';
import { Auth, AuthUser } from '../../../decorators';
import { UpdateUserProfileDto } from '../domains/dtos/update-user-profile.dto';
import type { UserDto } from '../domains/dtos/user.dto';
import { UserEntity } from '../domains/entities/user.entity';
import { UserService } from '../services/user.service';
import { ChangePasswordDto } from './../domains/dtos/change-password-dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post(':id/change-password')
  @HttpCode(HttpStatus.OK)
  @Auth([ROLE_TYPE.USER])
  changePassword(
    @AuthUser() user: UserEntity,
    @Param('id') userId: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(userId, changePasswordDto, user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') userId: number) {
    return this.userService.getOneById(userId);
  }

  @Put(':userId/profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Param('userId') userId: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserDto> {
    return this.userService.updateUserProfile(userId, updateUserProfileDto);
  }
}
