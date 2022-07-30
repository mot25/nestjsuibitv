import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUser } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {

    }

    async createUser(dto: CreateUser) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async getAllUser() {
        const users = await this.userRepository.findAll()
        return users
    }
}
