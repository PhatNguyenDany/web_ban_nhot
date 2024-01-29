import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { userId } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = { ...createUserDto } as User;
    user.username = username;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  async update(userId: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update({ userId }, user);
    return this.userRepository.findOne({ where: { userId } });
  }

  async remove(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
