import { Request, Response } from "express";
import { DeleteOrganizationSectorUseCase } from "./DeleteOrganizationSectorUseCase";
import { DeleteOrganizationSectorRequestSchema, DeleteOrganizationSectorResponseDTO, DeleteOrganizationSectorResponseSchema } from "./DeleteOrganizationSectorDTO";
import { ZodError } from "zod";

export class DeleteOrganizationSectorController {
    constructor(private deleteOrganizationSectorUseCase: DeleteOrganizationSectorUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { sectorId } = DeleteOrganizationSectorRequestSchema.parse(request.body);
            const sectorDeletedOrError = await this.deleteOrganizationSectorUseCase.execute(sectorId);
            if (sectorDeletedOrError instanceof Error) {
                return response.status(400).json({ error: sectorDeletedOrError.message });
            }
            const responseInFormat = DeleteOrganizationSectorResponseSchema.parse({ id: sectorDeletedOrError.id, ...sectorDeletedOrError.props } as DeleteOrganizationSectorResponseDTO)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors })
        }
    }
}