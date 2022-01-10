import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ObjectId } from 'mongoose'

import { ProductsService } from './products.service'
import { ProductDto } from './dtos/product.dto'
import { AuthGuard } from '../auth/guards/auth.guard'

@Controller('/products')
export class ProductsController {
    constructor(private _productsService: ProductsService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    createProduct(@Body() dto: ProductDto) {
        return this._productsService.createProduct(dto)
    }

    @Get()
    @UseGuards(AuthGuard)
    getProducts() {
        return this._productsService.getProducts()
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getProductById(@Param('id') id: ObjectId) {
        return this._productsService.getProductById(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateProduct(@Param('id') id: ObjectId, @Body() dto: ProductDto) {
        return this._productsService.updateProduct(id, dto)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id: ObjectId) {
        return this._productsService.deleteProduct(id)
    }
}