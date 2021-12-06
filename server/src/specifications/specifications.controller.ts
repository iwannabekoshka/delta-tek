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

    // @Get('/search')
    // search(@Query('query') query: string) {
    //     return this.trackService.search(query)
    // }
    //
    // @Get(':id')
    // getOne(@Param('id') id: ObjectId) {
    //     return this.trackService.getOne(id)
    // }
    //
    // @Delete(':id')
    // delete(@Param('id') id: ObjectId) {
    //     return this.trackService.delete(id)
    // }
    //
    // @Post('/comment')
    // addComment(@Body() dto: CreateCommentDto) {
    //     return this.trackService.addComment(dto)
    // }
    //
    // @Post('/listen/:id')
    // listen(@Param('id') id: ObjectId) {
    //     return this.trackService.listen(id)
    // }
}