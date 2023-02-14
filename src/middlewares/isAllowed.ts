import { NextFunction, Request, Response } from "express"
import { prisma } from "../database";
import { JwtPayload, verify } from "jsonwebtoken";

declare module "jsonwebtoken" {
    export interface JwtPayload {
        userId: string;
    }
}

export function isAllowed(allowRoles: string[]) {
    return async (resquest: Request, response: Response, next: NextFunction) => {
        const authHeader = resquest.headers.authorization;
        if (!authHeader) {
            return response.status(401).json({ error: 'Token is missing!' })
        }
        const [, token] = authHeader.split(' ')
        if (!process.env.SECRET_JWT) {
            return response.status(401).json({ error: 'Token is missing!' })
        }
        const payLoadUser = verify(token, process.env.SECRET_JWT) as JwtPayload;

        const userAndRoles = await prisma.user.findFirst({
            where: {
                id: payLoadUser.userId
            },
            select: {
                name: true,
                registerRole: {
                    select: {
                        roleId: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }

        })

        const userRoles = userAndRoles?.registerRole.map(role => { return role.roleId.name });
        const permissionExist = userRoles?.some(role => allowRoles.includes(role))
        if (!permissionExist) {
            return response.status(401).json({
                error: `Permission denied - user not have roles: ${allowRoles} `,
                roleRequired: allowRoles
            });
        }
        next()
    }
}
