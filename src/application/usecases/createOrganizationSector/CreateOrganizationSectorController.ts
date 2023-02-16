import { Request, Response } from "express";
import { CreateOrganizationSectorUseCase } from "./CreateOrganizationSectorUseCase";
import { IOrganizationSectorRequestDTO } from "./CreateOranizationSectorDTO";

export class CreateOrganizationSectorController {
    constructor(private createOrganizationSectorUseCase: CreateOrganizationSectorUseCase) { }

    async handle(request: Request, response: Response) {
        const { name, created_at, updated_at, employeesAllocated, organization_id } = request.body;
        try {
            const sectorIdOrError = await this.createOrganizationSectorUseCase.execute({ name, created_at, updated_at, employeesAllocated, organization_id } as IOrganizationSectorRequestDTO)
            if (sectorIdOrError instanceof Error) {
                return response.status(500).json({ error: sectorIdOrError.message })
            }
            return response.status(200).json(sectorIdOrError);
        } catch (error) {
            return response.status(500).json({ error: 'Unexpected Error' })
        }
    }
}