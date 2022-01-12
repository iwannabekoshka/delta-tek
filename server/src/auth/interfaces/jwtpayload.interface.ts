export interface JwtPayload {
    sub: string
    iat?: number
    exp?: number
    jti?: string
    role: string
    email?: string
    phone?: string
}
