import { Request, Response } from "express";
import { GetAllUserByOrganizationUseCase } from "./GetAllUserByOrganizationUseCase";
import { GetAllUserByOrganizationRequestSchema, GetAllUserByOrganizationResponseSchema, UserByOrganizationResponseDTO } from "./GetAllUserByOrganizationDTO";
import { ZodError } from "zod";

export class GetAllUserByOrganizationController {
    constructor(private getAllUserByOrganizationUseCase: GetAllUserByOrganizationUseCase) {
    }
    async handle(request: Request, response: Response) {
        try {
            const { organizationId } = GetAllUserByOrganizationRequestSchema.parse(request.body)
            const usersOrError = await this.getAllUserByOrganizationUseCase.execute(organizationId);
            if (usersOrError instanceof Error) {
                return response.status(400).json({ error: usersOrError.message });
            }
            const responseInformat = GetAllUserByOrganizationResponseSchema.parse(usersOrError.map(user => {
                const { email, name, organization_sector_id, status, created_at, updated_at } = user.props;
                return { id: user.id, created_at, email, name, organization_sector_id, status, updated_at } as UserByOrganizationResponseDTO;
            }))
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(400).json(errors.issues)
            }
            return response.status(400).json({ error: 'Unxpected Error', typeErrors: errors })
        }
    }
}