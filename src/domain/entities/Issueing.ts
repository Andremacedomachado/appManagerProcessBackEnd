import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export type PayloadTokenType = {
    userId: string,
    iat: number,
    exp: number
}

export abstract class Issueing {

    static getIssueingInPayloadRequest(request: Request) {
        const payloadToken = request.headers.authorization && process.env.SECRET_JWT ? verify(request.headers.authorization.split(' ')[1], process.env.SECRET_JWT) as PayloadTokenType : null;
        return payloadToken
    }
}