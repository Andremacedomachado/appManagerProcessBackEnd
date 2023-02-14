import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";



export const isAuthenticated = () => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).json({ error: 'Token is missing!' })
        }

        const [, token] = authHeader.split(' ');

        if (!process.env.SECRET_JWT) {
            return response.status(500).json({ error: 'Erro env sytem - key secret autentication' })
        }
        try {
            await verify(token, process.env.SECRET_JWT);
            return next();
        } catch (error) {
            return response.status(401).end();
        }
    }
};