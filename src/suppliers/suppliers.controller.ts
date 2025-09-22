import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/enums/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/enums/roles.guard';

@Controller('suppliers')
@ApiTags('Suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve all suppliers'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Retrieve supplier by ID' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.suppliersService.findOne(+id);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create new supplier' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update supplier' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete supplier' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.suppliersService.remove(+id);
  }
}
