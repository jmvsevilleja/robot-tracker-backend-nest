import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Robot } from './robot.entity';

@Injectable()
export class RobotService {
  constructor(
    @InjectRepository(Robot)
    private readonly robotRepository: Repository<Robot>,
  ) {}

  async findAll(): Promise<Robot[]> {
    return await this.robotRepository.find();
  }

  async findOne(id: number): Promise<Robot> {
    return await this.robotRepository.findOneBy({ id: id });
  }

  async create(bot: Robot): Promise<Robot> {
    return await this.robotRepository.save(bot);
  }

  async update(id: number, bot: Robot): Promise<void> {
    await this.robotRepository.update(id, bot);
  }

  async delete(id: number): Promise<void> {
    await this.robotRepository.delete(id);
  }
}
