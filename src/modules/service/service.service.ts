import { Injectable, Logger } from '@nestjs/common';
import { ServiceRepo } from './repository/service.repo';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceService {
  private readonly logger = new Logger(ServiceService.name);
  constructor(
    private readonly config: ConfigService,
    private readonly serviceRepo: ServiceRepo,
  ) {}
}
