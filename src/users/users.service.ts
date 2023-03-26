import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user_id = new ObjectId(id);
    return this.userRepository.findOne(user_id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: string, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
