import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Headers,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Robot } from './entities/robot.entity';
import { RobotsService } from './robots.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('robots')
export class RobotsController {
  constructor(
    private readonly robotService: RobotsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Robot[]> {
    return this.robotService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Robot> {
    return this.robotService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async findByUserId(
    @Param('id') id: string,
    @Headers() headers,
  ): Promise<any> {
    const jwtPayload = headers.authorization
      ? this.authService.decodeJwtToken(headers.authorization.split(' ')[1])
      : null;

    if (!jwtPayload || jwtPayload.sub !== id) {
      throw new UnauthorizedException();
    }

    return this.robotService.findRobotsByUserId(jwtPayload.sub);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() bot: Robot): Promise<Robot> {
    console.log('bot', bot);
    return this.robotService.create(bot);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() bot: Robot): Promise<Robot> {
    return this.robotService.update(id, bot);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.robotService.delete(id);
  }
}
