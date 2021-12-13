import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ObjectId } from 'mongoose'

import { ProductsService } from './products.service'
import { ProductDto } from './dtos/product.dto'

@Controller('/products')
export class ProductsController {
    constructor(private _productsService: ProductsService) {
    }

    @Post()
    createProduct(@Body() dto: ProductDto) {
        return this._productsService.createProduct(dto)
    }

    @Get()
    getProducts() {
        return this._productsService.getProducts()
    }

    @Get(':id')
    getProductById(@Param('id') id: ObjectId) {
        return this._productsService.getProductById(id)
    }

    // @Put(':id')
    // updateAdmin(@Param('id') id: ObjectId, @Body() dto: ProductDto) {
    //     return this._adminsService.updateAdmin(id, dto.password)
    // }
    //
    @Delete(':id')
    deleteProduct(@Param('id') id: ObjectId) {
        return this._productsService.deleteProduct(id)
    }
}