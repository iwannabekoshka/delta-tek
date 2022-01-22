import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'

import { OrderFormDto } from './dtos/order-form.dto'
import { OrderForm, OrderFormDocument } from './schemas/order-form.schema'

@Injectable()
export class OrderFormService {
    private _logger = new Logger(OrderFormService.name)

    constructor(
        @InjectModel(OrderForm.name) private _orderFormModel: Model<OrderFormDocument>,
    ) {
    }

    async createItem(input: OrderFormDto): Promise<OrderForm> {
        try {
            const orderFormItem = new this._orderFormModel(input)
            return await orderFormItem.save()
        } catch (error) {
            this._logger.error(error, 'createItem method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getItems(): Promise<OrderForm[]> {
        try {
            const orderFormItems = await this._orderFormModel.find()
            if (orderFormItems.length <= 0) {
                new NotFoundException(`Couldn't find order form items`)
            }
            return await orderFormItems
        } catch (error) {
            this._logger.error(error, 'getItems method error')
            throw new InternalServerErrorException(error)
        }
    }

    async updateItem(id: ObjectId, input: OrderFormDto): Promise<any> {
        try {
            const orderFormItem = await this._orderFormModel.updateOne({_id: id}, input)
            if (!orderFormItem) {
                new NotFoundException(`Couldn't find order form item`)
            }
            return orderFormItem
        } catch (error) {
            this._logger.error(error, 'updateItem method error')
            throw new InternalServerErrorException(error)
        }
    }

    async deleteItem(id: ObjectId): Promise<OrderForm> {
        try {
            return await this._orderFormModel.findByIdAndDelete(id)
        } catch (error) {
            this._logger.error(error, 'deleteItem method error')
            throw new InternalServerErrorException(error)
        }
    }

}