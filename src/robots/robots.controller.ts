import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Robot } from './entities/robot.entity';
import { RobotsService } from './robots.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('robots')
export class RobotsController {
  constructor(private readonly botService: RobotsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Robot[]> {
    return this.botService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Robot> {
    return this.botService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() bot: Robot): Promise<Robot> {
    console.log('bot', bot);
    return this.botService.create(bot);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() bot: Robot): Promise<Robot> {
    return this.botService.update(id, bot);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.botService.delete(id);
  }
}
