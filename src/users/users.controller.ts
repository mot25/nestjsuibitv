import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('users1')
@Controller('users')
export class UsersController {

    constructor(
        private UsersService: UsersService

    ) { }

    @ApiOperation({ summary: 'summary create user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() data: CreateUserDto) {
        const user = this.UsersService.createUser(data)
        return user
    }


    @ApiOperation({ summary: 'summary getAll user' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        const users = this.UsersService.getAllUser()
        return users
    }


    @Delete(':id')
    deleteById(@Param('id') id: number) {
        return this.UsersService.deleteUser(id)
    }
}
