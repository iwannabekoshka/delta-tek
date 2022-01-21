const path = require('path')

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { FilesInterceptor } from '@nestjs/platform-express'

import { ProductsService } from './products.service'
import { ProductDto } from './dtos/product.dto'
import { AuthGuard } from '../auth/guards/auth.guard'

const MAX_FILES_COUNT = 5

@Controller('/products')
export class ProductsController {
    constructor(private _productsService: ProductsService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('files', MAX_FILES_COUNT, {
        dest: path.resolve(__dirname, '../../../client/public/img'),
    }))
    createProduct(@Body() dto: ProductDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        const imagesPaths = []
        files.forEach(file => {
            const imagePath = 'img/' + file.filename
            imagesPaths.push(imagePath)
        })
        return this._productsService.createProduct(dto, imagesPaths)
    }

    @Get()
    getProducts() {
        return this._productsService.getProducts()
    }

    @Get(':id')
    getProductById(@Param('id') id: ObjectId) {
        return this._productsService.getProductById(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('files', MAX_FILES_COUNT, {
        dest: path.resolve(__dirname, '../../../client/public/img'),
    }))
    updateProduct(@Param('id') id: ObjectId, @Body() dto: ProductDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        const imagesPaths = []
        if (files.length > 0) {
            files.forEach(file => {
                const imagePath = 'img/' + file.filename
                imagesPaths.push(imagePath)
            })
        }
        return this._productsService.updateProduct(id, dto, imagesPaths)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id: ObjectId) {
        return this._productsService.deleteProduct(id)
    }
}