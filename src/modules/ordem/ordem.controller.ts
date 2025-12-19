import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrdemDTO } from './dto/CreateOrdemDTO';
import { OrdemService } from './ordem.service';

@Controller('ordem')
export class OrdemController {
  constructor(private readonly ordemService: OrdemService) {}
  @Post()
  async createOrdem(@Body() body: CreateOrdemDTO) {
    return await this.ordemService.createOrdem(body);
  }
}
