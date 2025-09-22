import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/enums/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/enums/roles.guard';
import { Category } from './category.entity';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  // @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve all categories'})
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  findAll():Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  // @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve a category by ID'})
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number):Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  
  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Create a new category'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createCategoryDto: CreateCategoryDto):Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'update a category'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ):Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Delete a category'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number):Promise<void> {
    return this.categoriesService.remove(id);
  }
}
