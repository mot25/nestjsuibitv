import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';

@ApiTags('users1')
@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService) { }

    @ApiOperation({ summary: 'summary create user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() data: CreateUser) {
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

}
