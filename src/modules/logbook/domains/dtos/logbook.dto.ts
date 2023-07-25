import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/abstract.dto';
import type { LogbookEntity } from '../entities/logbook.entity';

export class LogbookDto extends AbstractDto {
  @ApiProperty()
  logbookId?: number;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  confirmed?: boolean;

  @ApiProperty()
  confirmedDescription?: string;

  @ApiProperty()
  isDeleted?: boolean;

  @ApiProperty()
  deviceId?: number;

  @ApiProperty()
  deviceName?: string;

  @ApiProperty()
  deviceImage?: string;

  @ApiProperty()
  userId?: number;

  @ApiProperty()
  userName?: string;

  @ApiProperty()
  userEmail?: string;

  constructor(logbookEntity: LogbookEntity) {
    super(logbookEntity);
    this.logbookId = logbookEntity.id;
    this.description = logbookEntity.description;
    this.status = logbookEntity.status;
    this.type = logbookEntity.type.type;
    this.confirmed = logbookEntity.confirmed;
    this.confirmedDescription = logbookEntity.confirmedDescription;
    this.isDeleted = logbookEntity.isDeleted;
    this.deviceId = logbookEntity.device.id;
    this.deviceName = logbookEntity.device.name;
    this.deviceImage = logbookEntity.device.image;
    this.userId = logbookEntity.user.id;
    this.userName = logbookEntity.user.name;
    this.userEmail = logbookEntity.user.email;
  }
}
