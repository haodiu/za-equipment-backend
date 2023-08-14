import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

import { DeviceStatusType } from '../../../../constants/device-status';
import { IsNullable, Trim } from '../../../../decorators';

export class InputDeviceDto {
  @ApiPropertyOptional()
  @IsString()
  @Trim()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  typeId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNullable()
  @IsNumber()
  userId?: number;

  @ApiPropertyOptional({
    type: 'string',
    enum: ['not_used', 'in_use', 'need_repair', 'pending_disposal', 'disposed'],
  })
  @IsOptional()
  @IsString()
  @Trim()
  deviceStatus?: DeviceStatusType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Trim()
  purchaseLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Trim()
  @ValidateIf((o) => o.purchaseDate !== null && o.purchaseDate !== undefined)
  @Matches(/^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/, {
    message: 'Invalid date format. Use dd/mm/yyyy.',
    each: true,
    always: false,
  })
  purchaseDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Trim()
  image?: string;
}
