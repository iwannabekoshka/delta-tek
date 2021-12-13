import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type SpecificationDocument = Specification & Document

export const SPECIFICATION_COLLECTION_NAME = 'specifications'
@Schema({ collection: SPECIFICATION_COLLECTION_NAME})
export class Specification {

    _id: string

    @Prop({type: String, required: true, unique: true })
    name: string

}

export const SpecificationSchema = SchemaFactory.createForClass(Specification)