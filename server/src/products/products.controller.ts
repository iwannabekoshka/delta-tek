import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ObjectId } from 'mongoose'

import { ProductsService } from './products.service'
import { ProductDto } from './dtos/product.dto'
import { AuthGuard } from '../auth/guards/auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/products')
export class ProductsController {
    constructor(private _productsService: ProductsService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        dest: '../client/images/products'
    }))
    createProduct(@Body() dto: ProductDto, @UploadedFile() file: Express.Multer.File) {
        const { path: imagePath } = file
        return this._productsService.createProduct(dto, imagePath)
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
    @UseInterceptors(FileInterceptor('file', {
        dest: '../client/images/products'
    }))
    updateProduct(@Param('id') id: ObjectId, @Body() dto: ProductDto, @UploadedFile() file: Express.Multer.File) {
        let imagePath
        if (file){
            imagePath = file.path
        }
        return this._productsService.updateProduct(id, dto, imagePath)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id: ObjectId) {
        return this._productsService.deleteProduct(id)
    }
}