import { Injectable, CanActivate, ExecutionContext, Logger, BadRequestException } from '@nestjs/common'
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly _authService: AuthService) {}
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers
        if (authorization == undefined) {
            throw new BadRequestException(
                'header authorization is empty',
            )
        }
        const verified = await this._authService.decodeToken(authorization.replace('Bearer ', ''))
        return !!verified
    }
}