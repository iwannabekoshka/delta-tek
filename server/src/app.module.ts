import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { config } from './config/config'
import { mongooseConfig } from './config/mongoose.config'

import { SpecificationsModule } from './specifications/specifications.module'
import { RolesModule } from './roles/roles.module'
import { AdminsModule } from './admins/admins.module'
import { ProductsModule } from './products/products.module'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        MongooseModule.forRootAsync(mongooseConfig),
        SpecificationsModule,
        RolesModule,
        AdminsModule,
        ProductsModule,
    ],
})
export class AppModule {
}
