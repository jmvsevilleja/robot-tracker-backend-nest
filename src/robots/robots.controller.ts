import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Robot } from './entities/robot.entity';
import { RobotsService } from './robots.service';

@Controller('robots')
export class RobotsController {
  constructor(private readonly botService: RobotsService) {}

  @Get()
  async findAll(): Promise<Robot[]> {
    return this.botService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Robot> {
    return this.botService.findOne(id);
  }

  @Post()
  async create(@Body() bot: Robot): Promise<Robot> {
    console.log('bot', bot);
    return this.botService.create(bot);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() bot: Robot): Promise<Robot> {
    return this.botService.update(id, bot);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.botService.delete(id);
  }
}
