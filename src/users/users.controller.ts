import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Rolses } from 'src/auth/roles-auth.decoration';
import { RolesGuard } from 'src/auth/roles.guard';
import { BannedUsersDto } from 'src/roles/dto/bannedUsers.dto';
import { GetRoleDto } from 'src/roles/dto/getRole.dto';

import { JwtAuthGuard } from './../auth/jwt-auth.guard';
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


    @Get('userByEmail/:email')
    getByEmail(@Param('email') email: string) {
        return this.UsersService.getUserByEmail(email)
    }


    @ApiOperation({ summary: 'summary getAll user' })
    @ApiResponse({ status: 200, type: [User] })
    // @UseGuards(JwtAuthGuard)
    @Get()
    @Rolses('User')
    @UseGuards(RolesGuard)
    getAll() {
        const users = this.UsersService.getAllUsers()
        return users
    }


    @Post('addRole')
    addRole(@Body() data: GetRoleDto) {
        return this.UsersService.addRole(data)
    }
    

    @Post('bannedUsers')
    banned(@Body() data: BannedUsersDto) {
        return this.UsersService.banned(data)
    }


}
