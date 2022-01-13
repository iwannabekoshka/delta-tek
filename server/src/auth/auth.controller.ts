import { Body, Controller, Post } from '@nestjs/common'

import { AdminDto } from '../admins/dtos/admin.dto'
import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
    constructor(private _authService: AuthService) {
    }

    @Post('/login')
    login(@Body() dto: AdminDto) {
        return this._authService.signIn(dto)
    }
}