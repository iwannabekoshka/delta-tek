import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Admin } from './admin.schema'

export type RefreshTokenDocument = RefreshToken & Document

export const REFRESH_TOKEN_COLLECTION_NAME = 'refresh_token'
@Schema({ collection: REFRESH_TOKEN_COLLECTION_NAME})
export class RefreshToken {

    _id: string

    @Prop({ type: Types.ObjectId, required: true, ref: 'Admin' })
    admin: Admin

    @Prop({type: String, required: true })
    token: string

    @Prop({type: Date, required: true })
    expiresAt: Date
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)