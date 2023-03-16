import { Request, Response } from "express";
import { GetOrganizationSectorByIdUseCase } from "./GetOrganizationSectorByIdUseCase";
import { GetOrganizationSectorRequestSchema, GetOrganizationSectorResponseDTO, GetOrganizationSectorResponseSchema } from "./GetOrganizationSectorByIdDTO";
import { ZodError } from "zod";

export class GetOrganizationSectorByIdController {
    constructor(private getOrganizationSectorByIdUseCase: GetOrganizationSectorByIdUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { sectorId } = GetOrganizationSectorRequestSchema.parse(request.body)
            const sectorOrError = await this.getOrganizationSectorByIdUseCase.execute(sectorId);
            if (sectorOrError instanceof Error) {
                return response.status(500).json({ error: sectorOrError.message })
            }
            const { name, employeesAllocated, organization_id, created_at, updated_at } = sectorOrError.props
            const responseInFormat = GetOrganizationSectorResponseSchema.parse({
                id: sectorOrError.id,
                name,
                created_at,
                updated_at,
                employeesAllocated,
                organization_id
            } as GetOrganizationSectorResponseDTO);
            return response.status(200).json(responseInFormat);

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            };
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors })

        }
    }
}