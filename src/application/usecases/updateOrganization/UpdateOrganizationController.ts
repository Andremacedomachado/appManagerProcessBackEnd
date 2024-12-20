import { Request, Response } from "express";
import { UpdateOrganizationFormSchema } from "./UpdateOrganizationDTO";
import { UpdateOrganizationUseCase } from "./UpdateOrganzationUseCase";
import { ZodError } from "zod";


export class UpdateOrganizationController {

    constructor(private updateOrganizationUsecase: UpdateOrganizationUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const verifyParsedPayload = UpdateOrganizationFormSchema.parse({
                id: request.params.id,
                ...request.body
            })

            const organizationOrNull = this.updateOrganizationUsecase.execute(verifyParsedPayload)
            if (!organizationOrNull) {
                return response.status(400).json({ message: 'Organization not Exists' })
            }

            return response.status(204).json()

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(400).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}