import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Robot } from './robot.entity';
import { RobotController } from './robot.controller';
import { RobotService } from './robot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Robot])],
  controllers: [RobotController],
  providers: [RobotService],
})
export class RobotModule {}
