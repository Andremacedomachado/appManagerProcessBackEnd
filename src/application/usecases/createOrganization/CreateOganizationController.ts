import { Request, Response } from "express";
import { CreateOrganizationUsecase } from "./CreateOrganizationUseCase";
import { CreateOrganizationRequestDTO } from "./CreateOrganizationDTO";


export class CreateOrganizationController {

    constructor(private createOrganizationUseCase: CreateOrganizationUsecase) { };

    async handle(request: Request, response: Response) {
        const { name, employeesAllocated, created_at, updated_at }: CreateOrganizationRequestDTO = request.body;

        try {
            const organizationIdOrError = await this.createOrganizationUseCase.excute({ name, employeesAllocated, created_at, updated_at });
            if (organizationIdOrError instanceof Error) {
                return response.status(500).json({ error: organizationIdOrError.message });
            }
            return response.status(200).json(organizationIdOrError);
        } catch (error) {
            return response.status(500).json({ error: 'Unexpected Error' });
        }
    };
}