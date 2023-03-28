import { Request, Response } from "express";
import { DeleteOrganizationOnCascadeUseCase } from "./DeleteOrganizationOnCascadeUseCase";
import { DeleteOrganizationOnCascadeRequestSchema, DeleteOrganizationOnCascadeResponseDTO, DeleteOrganizationOnCascadeResponseSchema, InfoSectorDeletedCascadeResponseDTO, UnlinkUserResponseDTO, collectionSectorDeletedCascadeResponseDTO } from "./DeleteOrganizationOnCascadeDTO";


export class DeleteOrganizationOnCascadeController {
    constructor(private deleteOrganizationOnCascadeUseCase: DeleteOrganizationOnCascadeUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { organizationId } = DeleteOrganizationOnCascadeRequestSchema.parse(request.body);
            const dataDeletedOrError = await this.deleteOrganizationOnCascadeUseCase.execute(organizationId);
            if (dataDeletedOrError instanceof Error) {
                return response.status(400).json(dataDeletedOrError)
            }

            dataDeletedOrError
            const responseInFormat = DeleteOrganizationOnCascadeResponseSchema.parse({
                collectionOfAffectedSectors: dataDeletedOrError.collectionOfAffectedSectors.map(sector => {
                    const { collectionOfAffectedUsers, infoSectorDeleted } = sector
                    return {
                        collectionOfAffectedUsers: collectionOfAffectedUsers.map(user => {
                            return { ...user.props, id: user.id } as UnlinkUserResponseDTO;
                        }),
                        infoSectorDeleted: { ...infoSectorDeleted.props, id: infoSectorDeleted.id } as InfoSectorDeletedCascadeResponseDTO
                    } as collectionSectorDeletedCascadeResponseDTO;
                }),
                infoOrganizationDeleted: { ...dataDeletedOrError.infoOrganizationDeleted.props, id: dataDeletedOrError.infoOrganizationDeleted.id }
            } as DeleteOrganizationOnCascadeResponseDTO)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof Error) {
                return response.status(400).json({ error: errors.message })

            }
        }
    }
}