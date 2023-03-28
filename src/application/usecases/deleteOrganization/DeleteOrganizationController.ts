import { Request, Response } from "express";
import { DeleteOrganizationUseCase } from "./DeleteOrganizationUseCase";
import { DeleteOrganizationRequestSchema, DeleteOrganizationResponseSchema } from "./DeleteOrganizationDTO";
import { ZodError } from "zod";

export class DeleteOrganizationController {
    constructor(private deleteOrganizationUseCase: DeleteOrganizationUseCase,) {
    }

    async handle(request: Request, response: Response) {

        try {
            const { organizationId } = DeleteOrganizationRequestSchema.parse(request.body)

            const OrganizationDeletedOrError = await this.deleteOrganizationUseCase.execute(organizationId);

            if (OrganizationDeletedOrError instanceof Error) {
                return response.status(400).json({ error: OrganizationDeletedOrError.message })
            }
            const reponseInFormat = DeleteOrganizationResponseSchema.parse({ ...OrganizationDeletedOrError.props, id: OrganizationDeletedOrError.id })
            return response.status(200).json(reponseInFormat)

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}