import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ObjectId } from 'mongoose'

import { RolesService } from './roles.service'
import { RoleDto } from './dtos/role.dto'

@Controller('/roles')
export class RolesController {
    constructor(private _rolesService: RolesService) {
    }

    @Post()
    createRole(@Body() dto: RoleDto) {
        return this._rolesService.createRole(dto)
    }

    @Get()
    getRoles() {
        return this._rolesService.getRoles()
    }

    @Get(':id')
    getRoleById(@Param('id') id: ObjectId) {
        return this._rolesService.getRoleById(id)
    }

    @Delete(':id')
    deleteRole(@Param('id') id: ObjectId) {
        return this._rolesService.deleteRole(id)
    }
}