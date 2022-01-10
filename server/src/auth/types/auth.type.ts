export class AuthType {
    accessToken: string

    tokenType = 'Bearer'

    expiresIn: number

    refreshToken?: string

    idToken?: string

    constructor(partial?: Partial<AuthType>) {
        Object.assign(this, partial)
    }
}
