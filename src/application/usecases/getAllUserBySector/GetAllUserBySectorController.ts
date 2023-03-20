import { Request, Response } from "express";
import { GetAllUserBySectorUseCase } from "./GetAllUserBySectorUseCase";
import { GetAllUserBySectorRequestSchema, GetAllUserBySectorResponseSchema, UserBySectorResponseDTO } from "./GetAllUserBySectorDTO";
import { ZodError } from "zod";

export class GetAllUserBySectorController {
    constructor(private getAllUserBySector: GetAllUserBySectorUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { sectorId } = GetAllUserBySectorRequestSchema.parse(request.body)
            const usersOrError = await this.getAllUserBySector.execute(sectorId);
            if (usersOrError instanceof Error) {
                return response.status(400).json(usersOrError.message);
            }
            const responseInFormat = GetAllUserBySectorResponseSchema.parse(usersOrError.map(user => {
                const { email, name, organization_sector_id, status, created_at, updated_at } = user.props;
                return { id: user.id, created_at, email, name, organization_sector_id, status, updated_at } as UserBySectorResponseDTO;
            }))
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(400).json(errors.issues)
            }
            return response.status(400).json({ error: 'Unxpected Error', typeErrors: errors })
        }
    }
}