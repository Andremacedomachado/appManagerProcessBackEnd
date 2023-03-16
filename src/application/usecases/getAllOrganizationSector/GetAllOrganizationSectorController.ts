import { Request, Response } from "express";
import { GetAllOrganizationSectorUseCase } from "./GetAllOrganizationSectorUseCase";
import { GetAllOrganizationSectorResponseSchema, OrganizationSectorResponseDTO } from "./GetAllOrganizationSectorDTO";
import { ZodError } from "zod";

export class GetAllOrganizationSectorController {
    constructor(private getAllOrganizationSectorUseCase: GetAllOrganizationSectorUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const sectorsOrError = await this.getAllOrganizationSectorUseCase.execute();
            if (sectorsOrError instanceof Error) {
                return response.status(500).json({ error: sectorsOrError.message })
            }
            const responseInFormat = GetAllOrganizationSectorResponseSchema.parse(sectorsOrError.map(sector => {
                const { employeesAllocated, name, organization_id, created_at, updated_at } = sector.props;
                return {
                    id: sector.id,
                    name,
                    created_at,
                    updated_at,
                    organization_id,
                    employeesAllocated
                } as OrganizationSectorResponseDTO;
            }))
            return response.status(200).json(responseInFormat);

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors })
        }
    }
}