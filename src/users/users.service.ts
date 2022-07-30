import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService
    ) {

    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.rolesService.get('USER')
        await user.$set('Roles', [role.id])
        user.Roles = [role]
        return { user, Roles: [role]}
    }

    async getAllUser() {
        const users = await this.userRepository.findAll({ include: { all: true } })
        return users
    }


    async deleteUser(id: number) {
        return await this.userRepository.destroy({ where: { id } })
    }
}
