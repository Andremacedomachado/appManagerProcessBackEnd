import { Request, Response } from "express";
import { GetAllOrganizationUseCase } from "./GetAllOrganizationUseCase";
import { GetAllOrganizationResponseSchema, OrganizationResponseDTO } from "./GetAllOrganizationDTO";
import { ZodError } from "zod";


export class GetAllOrganizationController {

    constructor(private getAllOrganizationUseCase: GetAllOrganizationUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const organizationOrError = await this.getAllOrganizationUseCase.execute();
            if (organizationOrError instanceof Error) {
                return response.status(500).json({ error: organizationOrError.message });
            }

            const responseInFormat = GetAllOrganizationResponseSchema.parse(organizationOrError.map(organization => {
                const { name, employeesAllocated, created_at, updated_at } = organization.props
                return {
                    id: organization.id,
                    name,
                    created_at,
                    updated_at,
                    employeesAllocated

                } as OrganizationResponseDTO
            }))
            return response.status(200).json(responseInFormat);

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: "Unexpected Error" });
        }
    }
}