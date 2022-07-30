import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService) { }


    @Post()
    create(@Body() data: CreateUser) {
        const user = this.UsersService.createUser(data)
        return user
    }



    @Get()
    getAll() {
        const users = this.UsersService.getAllUser()
        return users
    }

}
