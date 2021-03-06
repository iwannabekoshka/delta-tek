import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Admin } from '../../admins/schemas/admin.schema'

@Schema()
export class ProductSpecification {

    @Prop({ type: Types.ObjectId, required: true })
    _id: string

    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    value: string
}

@Schema()
export class Thread {
    @Prop({ type: Types.ObjectId, required: true })
    _id: string

    @Prop({ type: Number, required: true })
    value: number

    @Prop({ type: Number, required: true })
    price: number
}

export type ProductDocument = Product & Document

export const PRODUCT_COLLECTION_NAME = 'products'

@Schema({ collection: PRODUCT_COLLECTION_NAME })
export class Product {

    _id: string

    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    description: string

    @Prop({ type: [String], required: true })
    images: Array<string>

    @Prop({ type: Number, required: true })
    price: number

    @Prop({ type: ProductSpecification } )
    specifications: Array<ProductSpecification>

    @Prop({ type: Thread } )
    thread: Array<Thread>

    @Prop({ type: Types.ObjectId, required: true, ref: 'Admin' })
    admin: Admin
}

export const ProductSchema = SchemaFactory.createForClass(Product)