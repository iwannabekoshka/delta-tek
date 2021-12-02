import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type RoleDocument = Role & Document

export const ROLE_COLLECTION_NAME = 'roles'
@Schema({ collection: ROLE_COLLECTION_NAME})
export class Role {

    _id: string

    @Prop({type: String, required: true })
    name: string

}

export const RoleSchema = SchemaFactory.createForClass(Role)