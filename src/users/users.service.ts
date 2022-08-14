import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BannedUsersDto } from 'src/roles/dto/bannedUsers.dto';
import { GetRoleDto } from 'src/roles/dto/getRole.dto';

import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.get("Admin")
        await user.$set('Roles', [role.id])
        user.Roles = [role]
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
        return user;
    }


    async addRole(data: GetRoleDto) {
        const user = await this.userRepository.findByPk(data.userId)

        const role = await this.roleService.get(data.value)

        if (user && role) {
            await user.$add('Role', role.id)
            return data
        }

        throw new HttpException('role or users not found', HttpStatus.NOT_FOUND)
    }
    async banned(data: BannedUsersDto) {
        const user = await this.userRepository.findByPk(data.userId);
        if (user) {
            user.banned = true
            user.banReason = data.banReason
            user.save()
            return user
        }
        throw new HttpException('role or users not found', HttpStatus.NOT_FOUND)

    }
}