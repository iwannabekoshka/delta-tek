import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SpecificationsController } from './specifications.controller'
import { SpecificationsService } from './specifications.service'
import { Specification, SpecificationSchema } from './schemas/specification.schema'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Specification.name, schema: SpecificationSchema }]),
        AuthModule,
    ],
    controllers: [SpecificationsController],
    providers: [SpecificationsService],
    exports: [SpecificationsService],
})
export class SpecificationsModule {
}