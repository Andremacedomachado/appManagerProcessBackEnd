import { Request, Response } from "express";
import { CreateOrganizationSectorUseCase } from "./CreateOrganizationSectorUseCase";
import { CreateOrganizationSectorRequestSchema, CreateOrganizationSectorResponseSchema, IOrganizationSectorRequestDTO } from "./CreateOranizationSectorDTO";
import { ZodError } from "zod";
export class CreateOrganizationSectorController {
    constructor(private createOrganizationSectorUseCase: CreateOrganizationSectorUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { name, created_at, updated_at, employeesAllocated, organization_id } = CreateOrganizationSectorRequestSchema.parse(request.body);
            const sectorIdOrError = await this.createOrganizationSectorUseCase.execute({ name, created_at, updated_at, employeesAllocated, organization_id } as IOrganizationSectorRequestDTO)
            if (sectorIdOrError instanceof Error) {
                return response.status(500).json({ error: sectorIdOrError.message })
            }
            const responseInFormat = CreateOrganizationSectorResponseSchema.parse(sectorIdOrError)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErros: errors })
        }
    }
}