import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Robot } from './entities/robot.entity';
import { RobotsController } from './robots.controller';
import { RobotsService } from './robots.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Robot]), AuthModule],
  controllers: [RobotsController],
  providers: [RobotsService],
})
export class RobotsModule {}
