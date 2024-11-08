import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Route này chỉ nên được sử dụng bởi admin
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Route này chỉ nên được sử dụng bởi admin
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    // Chỉ cho phép user xem thông tin của chính họ
    if (req.user.sub !== +id) {
      throw new ForbiddenException('You can only access your own information');
    }
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.sub !== +id) {
      throw new ForbiddenException('You can only update your own information');
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (req.user.sub !== +id) {
      throw new ForbiddenException('You can only delete your own account');
    }
    return this.usersService.remove(+id);
  }
}