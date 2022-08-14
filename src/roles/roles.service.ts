import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { BannedUsersDto } from './dto/bannedUsers.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { GetRoleDto } from './dto/getRole.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Role) private rolesReposetory: typeof Role
    ) { }

    async deleteRole(id: string) {
        return await this.rolesReposetory.destroy({ where: { id } })
    }

    async getAll() {
        return await this.rolesReposetory.findAll()
    }

    async create(data: CreateRoleDto) {
        return await this.rolesReposetory.create(data)
    }


    async get(value: string) {
        return await this.rolesReposetory.findOne({ where: { value } })
    }


    

}
