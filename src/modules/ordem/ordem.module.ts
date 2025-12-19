import { Module } from '@nestjs/common';
import { OrdemController } from './ordem.controller';
import { OrdemService } from './ordem.service';

@Module({
  controllers: [OrdemController],
  providers: [OrdemService],
})
export class OrdemModule {}
