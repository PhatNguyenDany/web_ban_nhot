import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  ParseIntPipe,
  UnauthorizedException,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/enums/roles.guard';
import { Roles } from 'src/enums/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all users
  @Get()
  @ApiBearerAuth('JWT')  
  @ApiOperation({summary:'Retrieve all users'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //get user by id
  @Get(':id')
  @ApiBearerAuth('JWT')  
  @ApiOperation({summary:'Retrieve a user by ID'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //Create a new user
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user as any);
  }

  //update user
  @Patch(':id')
  @ApiBearerAuth('JWT')  
  @ApiOperation({ summary: 'Update an existing user' })  
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: UpdateUserDto): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersService.update(id, userUpdate);
  }
  // Change-password
  @Patch('change-password/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Change user password' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
 async changePassword(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: ChangePasswordDto,)
  {
    const user = await this.usersService.findOne(id);
    if (!user) {
    throw new NotFoundException('User not found');
    }

    const isMatch = await this.usersService.comparePassword(dto.oldPassword, user.password);
    if (!isMatch) {
    throw new UnauthorizedException('Old password is incorrect');
    }
    return this.usersService.changePassword(id, dto.newPassword);
  }
  //delete user
  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary: 'Delete a user'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.remove(id);
  }
}
