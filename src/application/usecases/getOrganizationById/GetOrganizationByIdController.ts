import { Request, Response } from "express";
import { GetOrganizationByIdUseCase } from "./GetOrganizationByIdUseCase";
import { GetOrganizationIdRequestSchema, GetOrganizationResponseSchema } from "./GetOrganizationByIdDTO";
import { ZodError } from "zod";



export class GetOrganizationByIdController {

    constructor(private getOrganizationByIdUseCase: GetOrganizationByIdUseCase) { };

    async handle(request: Request, response: Response) {
        try {
            const { organizationId } = GetOrganizationIdRequestSchema.parse(request.body)
            const organizationOrError = await this.getOrganizationByIdUseCase.execute(organizationId);
            if (organizationOrError instanceof Error) {
                return response.status(500).json({ error: organizationOrError.message });
            }
            const { name, created_at, updated_at, employeesAllocated } = organizationOrError.props
            const responseInFormat = GetOrganizationResponseSchema.parse({
                id: organizationOrError.id,
                name,
                created_at,
                updated_at,
                employeesAllocated
            })
            return response.status(200).json(responseInFormat);

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error' });
        }
    }
}