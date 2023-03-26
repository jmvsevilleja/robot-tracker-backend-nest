import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Robot } from './entities/robot.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class RobotsService {
  constructor(
    @InjectRepository(Robot)
    private readonly robotRepository: Repository<Robot>,
  ) {}

  async findAll(): Promise<Robot[]> {
    return this.robotRepository.find();
  }

  async findOne(id: string): Promise<Robot> {
    const robot_id = new ObjectId(id);
    return this.robotRepository.findOne(robot_id);
  }

  async create(bot: Robot): Promise<Robot> {
    return await this.robotRepository.save(bot);
  }

  async update(id: string, bot: Robot): Promise<Robot> {
    // const robot_id = new ObjectId(id);
    // const robot = await this.robotRepository.findOne(robot_id);
    // if (!robot) {
    //   return undefined;
    // }
    // await this.robotRepository.update(id, bot);
    // return this.robotRepository.findOne(robot_id);
    bot.id = new ObjectId(id);
    return this.robotRepository.save(bot);
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.robotRepository.delete(id);
    return { deleted: result.affected !== 0 };
  }
}
