import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AdminsController } from './admins.controller'
import { AdminsService } from './admins.service'
import { Admin, AdminSchema } from './schemas/admin.schema'
import { RolesModule } from '../roles/roles.module'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
        RolesModule,
    ],
    controllers: [AdminsController],
    providers: [AdminsService],
    exports: [AdminsService]
})
export class AdminsModule {
}