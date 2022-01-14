import {
    forwardRef,
    HttpService,
    Inject,
    Injectable,
    Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomBytes } from 'crypto'
import * as jsonwebtoken from 'jsonwebtoken'
import * as moment from 'moment'
import { v4 as Uuidv4 } from 'uuid'

import { AdminDto } from '../admins/dtos/admin.dto'
import { Admin, AdminDocument } from '../admins/schemas/admin.schema'
import { AdminsService } from '../admins/admins.service'
import { AuthType } from './types/auth.type'
import { JwtPayload } from './interfaces/jwtpayload.interface'
import { RefreshToken, RefreshTokenDocument } from '../admins/schemas/refresh-token.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

const DEFAULT_ACCESS_TOKEN_TTL = 6000

@Injectable()
export class AuthService {
    private _logger = new Logger(AuthService.name)

    private readonly _expiresInSeconds: number
    private readonly _jwtOptions: jsonwebtoken.SignOptions
    private readonly _secret: string
    private readonly _tokenType: string
    private readonly _refreshTokenTtl: number

    constructor(
        private readonly _configService: ConfigService,
        private readonly _httpService: HttpService,
        @Inject(forwardRef(() => AdminsService))
        private readonly _adminsService: AdminsService,
        @InjectModel(RefreshToken.name) private _refreshTokenModel: Model<RefreshTokenDocument>,
        @InjectModel(Admin.name) private _adminModel: Model<AdminDocument>,
    ) {
        this._expiresInSeconds = +this._configService.get<number>(
            'ACCESS_TOKEN_TTL',
            DEFAULT_ACCESS_TOKEN_TTL,
        )
        this._jwtOptions = {
            expiresIn: this._expiresInSeconds,
            keyid: 'main',
        }

        this._secret = this._configService.get<string>(
            'SECRET',
            'secret')

        this._tokenType = this._configService.get<string>(
            'TOKEN_TYPE',
            'Bearer',
        )

        this._refreshTokenTtl = +this._configService.get<number>(
            'REFRESH_TOKEN_TTL',
            1,
        )
    }

    async signIn(input: AdminDto): Promise<AuthType> {
        const loginResults = await this._adminsService.login(input)
        if (!loginResults) {
            throw new Error('Forbidden login')
        }

        const { _id } = loginResults
        const { role_name } = input

        const payload: JwtPayload = {
            sub: _id,
            role: role_name,
        }

        const jwt = await this.createJWT(payload)

        return jwt
    }

    protected async createJWT(payload: JwtPayload): Promise<AuthType> {
        const jwt = await this.createAccessToken(payload)
        jwt.refreshToken = await this.createRefreshToken(payload.sub)

        return jwt
    }

    protected async createAccessToken(
        payload: JwtPayload,
        expires = this._expiresInSeconds,
    ): Promise<AuthType> {
        const options = this._jwtOptions
        options.expiresIn = expires
        options.jwtid = Uuidv4()

        const signedPayload = jsonwebtoken.sign(payload, this._secret, options)

        return {
            accessToken: signedPayload,
            expiresIn: expires,
            tokenType: this._tokenType,
        } as AuthType
    }

    protected async createRefreshToken(userId: string): Promise<string> {
        const REFRESH_TOKEN_LENGTH = 64
        const refreshToken = randomBytes(REFRESH_TOKEN_LENGTH).toString('hex')
        const token = {
            admin: userId,
            token: refreshToken,
            expiresAt: moment().add(this._refreshTokenTtl, 'd').toDate(),
        }
        const newRefreshToken = new this._refreshTokenModel(token)
        await newRefreshToken.save()

        return newRefreshToken.token
    }

    async getAccessTokenFromRefreshToken(
        refreshToken: string,
        oldAccessToken: string,
    ): Promise<AuthType> {
        const token = await this._refreshTokenModel.findOne({
            token: refreshToken,
        })
        const currentDate = new Date()
        if (!token) {
            throw new Error('Refresh token not found')
        }
        if (token.expiresAt < currentDate) {
            throw new Error('Refresh token expired')
        }
        const oldPayload = await this.decodeToken(oldAccessToken)

        const payload: JwtPayload = {
            sub: oldPayload.sub,
            role: oldPayload.role,
        }

        const jwt = await this.createJWT(payload)

        await this._refreshTokenModel.findByIdAndDelete(token.id )

        return jwt
    }

    async verifyToken(token: string): Promise<{ isVerified: boolean }> {
        try {
            jsonwebtoken.verify(token, this._secret)
            return {
                isVerified: true,
            }
        } catch (error) {
            this._logger.error(error)
            this._logger.warn(token)
            return {
                isVerified: false,
            }
        }
    }

    async decodeToken(token: string): Promise<JwtPayload> {
        const response = await this.verifyToken(token)
        if (response.isVerified) {
            const parsedToken: { sub: string; role: string } = await jsonwebtoken.decode(
                token,
            )
            console.dir(parsedToken, { depth: undefined })
            return parsedToken
        }
        return undefined
    }
}
