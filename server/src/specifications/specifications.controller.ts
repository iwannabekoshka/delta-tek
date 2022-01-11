import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ObjectId } from 'mongoose'

import { SpecificationsService } from './specifications.service'
import { SpecificationDTO } from './dtos/specification.dto'
import { AuthGuard } from '../auth/guards/auth.guard'

@Controller('/specifications')
export class SpecificationsController {
    constructor(private _specificationsService: SpecificationsService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    createSpecification(@Body() dto: SpecificationDTO) {
        return this._specificationsService.createSpecification(dto)
    }

    @Get()
    @UseGuards(AuthGuard)
    getSpecifications() {
        return this._specificationsService.getSpecifications()
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteSpecification(@Param('id') id: ObjectId) {
        return this._specificationsService.deleteSpecification(id)
    }
}