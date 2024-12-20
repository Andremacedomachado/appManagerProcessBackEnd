import { Request, Response } from "express";
import { UpdateOrganizationSectorUseCase } from "./UpdateOrganizationSectorUseCase";
import { UpdateOrganizationSectorFormSchema } from "./UpdateOrganizationSectorDTO";
import { UpdateOrganizationFormData } from "../updateOrganization/UpdateOrganizationDTO";
import { ZodError } from "zod";

export class UpdateOrganizationSectorController {

    constructor(private updateOrganizationSectorUseCase: UpdateOrganizationSectorUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const dataPayload = UpdateOrganizationSectorFormSchema.parse({ id: request.params.id, ...request.body } as UpdateOrganizationFormData);
            const organizationSectorOrNull = this.updateOrganizationSectorUseCase.execute(dataPayload);
            if (!organizationSectorOrNull) {
                return response.status(500).json({ message: 'Organization or Sector not Exist' })
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