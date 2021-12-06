import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

import { SpecificationsService } from './specifications.service'
import { SpecificationDTO } from './dtos/specification.dto'

@Controller('/specifications')
export class SpecificationsController {
    constructor(private _specificationsService: SpecificationsService) {
    }

    @Post()
    create(@Body() dto: SpecificationDTO) {
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