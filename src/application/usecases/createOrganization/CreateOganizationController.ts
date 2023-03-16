import { Request, Response } from "express";
import { CreateOrganizationUsecase } from "./CreateOrganizationUseCase";
import { CreateOrganizationRequestDTO, CreateOrganizationRequestSchema, CreateOrganizationResponseSchema } from "./CreateOrganizationDTO";
import { ZodError } from "zod";


export class CreateOrganizationController {

    constructor(private createOrganizationUseCase: CreateOrganizationUsecase) { };

    async handle(request: Request, response: Response) {

        try {
            const { name, employeesAllocated, created_at, updated_at } = CreateOrganizationRequestSchema.parse(request.body);
            const organizationIdOrError = await this.createOrganizationUseCase.excute({ name, employeesAllocated, created_at, updated_at });
            if (organizationIdOrError instanceof Error) {
                return response.status(500).json({ error: organizationIdOrError.message });
            }
            const responseInFormat = CreateOrganizationResponseSchema.parse(organizationIdOrError)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error' });
        }
    };
}