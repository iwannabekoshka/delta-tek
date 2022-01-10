import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'

import { AdminsService } from '../admins/admins.service'
import { SpecificationsService } from '../specifications/specifications.service'
import { ProductDto } from './dtos/product.dto'
import { Product, ProductDocument } from './schemas/product.schema'


@Injectable()
export class ProductsService {
    private _logger = new Logger(ProductsService.name)

    constructor(
        @InjectModel(Product.name) private _productModel: Model<ProductDocument>,
        private readonly _adminsService: AdminsService,
        private readonly _specificationsService: SpecificationsService,
    ) {
    }

    async createProduct(input: ProductDto): Promise<Product> {
        const { name, description, image, price, specifications, admin_id } = input
        try {
            const admin = await this._adminsService.getAdminById(admin_id)
            const specifications_arr = []
            for (const item of specifications) {
                const { value, name } = item
                const specification = await this._specificationsService.getSpecificationByName(name)
                specifications_arr.push({ _id: specification._id, name: specification.name, value })
            }

            const product = new this._productModel({
                name,
                description,
                image,
                price,
                specifications: specifications_arr,
                admin,
            })
            return await product.save()
        } catch (error) {
            this._logger.error(error, 'createProduct method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getProducts(): Promise<Product[]> {
        try {
            const products = await this._productModel.find().populate('admin')
            if (products.length <= 0) {
                new NotFoundException(`Couldn't find products`)
            }
            return await products
        } catch (error) {
            this._logger.error(error, 'getProducts method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getProductById(id: ObjectId): Promise<Product> {
        try {
            const product = await this._productModel.findById(id).populate('admin')
            if (!product) {
                new NotFoundException(`Couldn't find product`)
            }
            return await product
        } catch (error) {
            this._logger.error(error, 'getProductById method error')
            throw new InternalServerErrorException(error)
        }
    }

    async updateProduct(id: ObjectId, input: ProductDto): Promise<any> {
        const { name, description, image, price, specifications, admin_id } = input
        try {
            const admin = await this._adminsService.getAdminById(admin_id)
            const specifications_arr = []
            for (const item of specifications) {
                const { value, name } = item
                const specification = await this._specificationsService.getSpecificationByName(name)
                specifications_arr.push({ _id: specification._id, name: specification.name, value })
            }
            const product = await this._productModel.updateOne({_id: id}, {
                name,
                description,
                image,
                price,
                specifications: specifications_arr,
                admin,
            })
            if (!product) {
                new NotFoundException(`Couldn't find product`)
            }
            return product
        } catch (error) {
            this._logger.error(error, 'updateProduct method error')
            throw new InternalServerErrorException(error)
        }
    }

    async deleteProduct(id: ObjectId): Promise<Product> {
        try {
            return await this._productModel.findByIdAndDelete(id)
        } catch (error) {
            this._logger.error(error, 'deleteProduct method error')
            throw new InternalServerErrorException(error)
        }
    }

}