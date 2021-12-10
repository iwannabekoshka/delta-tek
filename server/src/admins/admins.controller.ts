import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ObjectId } from 'mongoose'

import { AdminsService } from './admins.service'
import { AdminDto } from './dtos/admin.dto'

@Controller('/admins')
export class AdminsController {
    constructor(private _adminsService: AdminsService) {
    }

    @Post()
    createAdmin(@Body() dto: AdminDto) {
        return this._adminsService.createAdmin(dto)
    }

    // @Get()
    // getRoles() {
    //     return this._adminsService.getRoles()
    // }
    //
    // @Get(':id')
    // getRoleById(@Param('id') id: ObjectId) {
    //     return this._adminsService.getRoleById(id)
    // }
    //
    // @Delete(':id')
    // deleteRole(@Param('id') id: ObjectId) {
    //     return this._adminsService.deleteRole(id)
    // }
}