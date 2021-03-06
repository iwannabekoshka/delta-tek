import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { Product, ProductSchema } from './schemas/product.schema'
import { AdminsModule } from '../admins/admins.module'
import { SpecificationsModule } from '../specifications/specifications.module'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
        AdminsModule,
        SpecificationsModule,
        AuthModule
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {
}