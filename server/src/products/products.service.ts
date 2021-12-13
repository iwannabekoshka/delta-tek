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
                specifications_arr.push({ ...specification, value })
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

    // async getAdmins(): Promise<Product[]> {
    //     try {
    //         const admins = await this._adminModel.find().populate('role')
    //         if (admins.length <= 0) {
    //             new NotFoundException(`Couldn't find admins`)
    //         }
    //         return await admins
    //     } catch (error) {
    //         this._logger.error(error, 'getAdmins method error')
    //         throw new InternalServerErrorException(error)
    //     }
    // }
    //
    // async getAdminById(id: ObjectId): Promise<Product> {
    //     try {
    //         const admin = await this._adminModel.findById(id)
    //         if (!admin) {
    //             new NotFoundException(`Couldn't find admin`)
    //         }
    //         return await admin
    //     } catch (error) {
    //         this._logger.error(error, 'getAdminById method error')
    //         throw new InternalServerErrorException(error)
    //     }
    // }
    //
    // async updateAdmin(id: ObjectId, password: string): Promise<Product> {
    //     try {
    //         const admin = await this._adminModel.updateOne({_id: id}, {
    //             password
    //         })
    //         if (!admin) {
    //             new NotFoundException(`Couldn't find admin`)
    //         }
    //         return await admin
    //     } catch (error) {
    //         this._logger.error(error, 'updateAdmin method error')
    //         throw new InternalServerErrorException(error)
    //     }
    // }
    //
    // async deleteAdmin(id: ObjectId): Promise<Product> {
    //     try {
    //         return await this._adminModel.findByIdAndDelete(id)
    //     } catch (error) {
    //         this._logger.error(error, 'deleteAdmin method error')
    //         throw new InternalServerErrorException(error)
    //     }
    // }

}