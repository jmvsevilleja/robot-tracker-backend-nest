import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Robot } from './robot.entity';
import { RobotService } from './robot.service';

@Controller('robots')
export class RobotController {
  constructor(private readonly botService: RobotService) {}

  @Get()
  async findAll(): Promise<Robot[]> {
    return this.botService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Robot> {
    return this.botService.findOne(+id);
  }

  @Post()
  async create(@Body() bot: Robot): Promise<Robot> {
    return this.botService.create(bot);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() bot: Robot): Promise<void> {
    await this.botService.update(+id, bot);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.botService.delete(+id);
  }
}
