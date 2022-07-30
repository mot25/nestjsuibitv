import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.model';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private AuthService: AuthService
    ) { }

    @Post('reg')
    reg(@Body() data: CreateUserDto) {
        return this.AuthService.registration(data)
    }

    @Post('login')
    login(@Body() data: CreateUserDto) {
        return this.AuthService.login(data)
    }




}
