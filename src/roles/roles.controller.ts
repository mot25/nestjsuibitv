import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(
        private roleService: RolesService
    ) {

    }



    @Get()
    getAllRoles() {
        return this.roleService.getAll()
    }


    @Delete(':id')
    deleteRoleByid(@Param('id') id: string) {
        return this.roleService.deleteRole(id)
    }


    @Get(':value')
    getByRoles(@Param('value') value: string) {
        return this.roleService.get(value)
    }

    @Post()
    createRoles(@Body() data: CreateRoleDto) {
        return this.roleService.create(data)
    }
}
