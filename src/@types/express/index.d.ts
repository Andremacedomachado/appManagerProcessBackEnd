import * as jwt from 'jsonwebtoken'

declare namespace Express {
    export interface Request {
        userId: string;
    }
}


declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        userId: string
    }
}