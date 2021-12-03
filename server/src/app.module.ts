import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { config } from './config/config'
import { mongooseConfig } from './config/mongoose.config'

import {SpecificationModule} from './specifications/specifications.module'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        MongooseModule.forRootAsync(mongooseConfig),
        SpecificationModule
    ],
})
export class AppModule {}
