import { forwardRef, HttpModule, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './guards/auth.guard'
import { AdminsModule } from '../admins/admins.module'
import { MongooseModule } from '@nestjs/mongoose'
import { RefreshToken, RefreshTokenSchema } from '../admins/schemas/refresh-token.schema'
import { Admin, AdminSchema } from '../admins/schemas/admin.schema'
import { AuthController } from './auth.controller'

@Module({
    imports: [HttpModule,
        forwardRef(() => AdminsModule),
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])
    ],
    controllers: [AuthController],
    exports: [AuthGuard, AuthService],
    providers: [AuthService, AuthGuard],
})
export class AuthModule {
}