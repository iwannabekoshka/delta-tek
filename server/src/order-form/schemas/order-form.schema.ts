import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type OrderFormDocument = OrderForm & Document

export const ORDER_FORM_COLLECTION_NAME = 'order-form'
@Schema({ collection: ORDER_FORM_COLLECTION_NAME})
export class OrderForm {

    _id: string

    @Prop({type: String, required: true })
    name: string

    @Prop({type: Number, required: true, unique: true })
    number: number

}

export const OrderFormSchema = SchemaFactory.createForClass(OrderForm)