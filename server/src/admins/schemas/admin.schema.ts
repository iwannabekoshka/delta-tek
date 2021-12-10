import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Role } from '../../roles/schemas/role.schema'

export type AdminDocument = Admin & Document

export const ADMIN_COLLECTION_NAME = 'admins'
@Schema({ collection: ADMIN_COLLECTION_NAME})
export class Admin {

    _id: string

    @Prop({type: String, required: true })
    name: string

    @Prop({type: String, required: true })
    password: string

    @Prop({ type: Types.ObjectId, required: true, ref: 'Role' })
    role: Role

}

export const AdminSchema = SchemaFactory.createForClass(Admin)