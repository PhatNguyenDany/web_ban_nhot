import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //get user by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user as any);
  }

  //update user
  @Put(':id')
  async update(@Param('id') id: number, @Body() User: User): Promise<any> {
    return this.usersService.update(id, User);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.remove(id);
  }
}
