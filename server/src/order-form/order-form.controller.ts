import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ObjectId } from 'mongoose'

import { OrderFormService } from './order-form.service'
import { OrderFormDto } from './dtos/order-form.dto'

@Controller('/order-form')
export class OrderFormController {
    constructor(private _orderFormService: OrderFormService) {
    }
    
    @Post()
    createItem(@Body() dto: OrderFormDto) {
        return this._orderFormService.createItem(dto)
    }

    @Get()
    getItems() {
        return this._orderFormService.getItems()
    }

    @Put(':id')
    updateItem(@Param('id') id: ObjectId, @Body() dto: OrderFormDto) {
        return this._orderFormService.updateItem(id, dto)
    }

    @Delete(':id')
    deleteItem(@Param('id') id: ObjectId) {
        return this._orderFormService.deleteItem(id)
    }
}