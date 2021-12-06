import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ObjectId } from 'mongoose'

import { SpecificationsService } from './specifications.service'
import { SpecificationDTO } from './dtos/specification.dto'

@Controller('/specifications')
export class SpecificationsController {
    constructor(private _specificationsService: SpecificationsService) {
    }

    @Post()
    createSpecification(@Body() dto: SpecificationDTO) {
        return this._specificationsService.createSpecification(dto)
    }

    @Get()
    getSpecifications() {
        return this._specificationsService.getSpecifications()
    }

    @Delete(':id')
    deleteSpecification(@Param('id') id: ObjectId) {
        return this._specificationsService.deleteSpecification(id)
    }
}