import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
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

    @Get('/login')
    login(@Body() dto: AdminDto) {
        return this._adminsService.login(dto)
    }

    @Get()
    getAdmins() {
        return this._adminsService.getAdmins()
    }

    @Get(':id')
    getAdminById(@Param('id') id: ObjectId) {
        return this._adminsService.getAdminById(id)
    }

    @Put(':id')
    updateAdmin(@Param('id') id: ObjectId, @Body() dto: AdminDto) {
        return this._adminsService.updateAdmin(id, dto.password)
    }

    @Delete(':id')
    deleteAdmin(@Param('id') id: ObjectId) {
        return this._adminsService.deleteAdmin(id)
    }
}