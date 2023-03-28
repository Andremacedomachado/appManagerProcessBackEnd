import { Request, Response } from "express";
import { DeleteOrganizationSectorOnCascadeUseCase } from "./DeleteOrganizationSectorOnCascadeUseCase";
import { DeleteOrganizationSectorOnCascadeRequestSchema, InfoSectorDeletedCascadeResponseDTO, SectorDeletedCascadeResponseDTO, SectorDeletedCascadedResponseSchema, SectorUnlinkUserResponseDTO } from "./DeleteOrganizationSectorOnCascadeDTO";

export class DeleteOrganizationSectorOnCascadeController {
    constructor(private deleteOrganizationSectorOnCascadeUseCase: DeleteOrganizationSectorOnCascadeUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { sectorId } = DeleteOrganizationSectorOnCascadeRequestSchema.parse(request.body);
            const dataDeletedOrError = await this.deleteOrganizationSectorOnCascadeUseCase.execute(sectorId);
            if (dataDeletedOrError instanceof Error) {
                return response.status(400).json(dataDeletedOrError)
            }
            const responseInFormat = SectorDeletedCascadedResponseSchema.parse({
                collectionOfAffectedUsers: dataDeletedOrError.collectionOfAffectedUsers.map(user => {
                    return { ...user.props, id: user.id } as SectorUnlinkUserResponseDTO;
                }),
                infoSectorDeleted: { ...dataDeletedOrError.infoSectorDeleted.props, id: dataDeletedOrError.infoSectorDeleted.id } as InfoSectorDeletedCascadeResponseDTO
            } as SectorDeletedCascadeResponseDTO)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof Error) {
                return response.status(400).json({ error: errors.message })
            }
        }
    }
}