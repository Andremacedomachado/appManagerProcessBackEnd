import { IDeleteRecordIntegrationRepository } from "../../repositories/IDeleteRecordIntegrationRepository"


export class DeleteOrganizationSectorOnCascadeUseCase {
    constructor(private deleteRecordIntegrationRepository: IDeleteRecordIntegrationRepository) { }

    async execute(sectorId: string) {

        const datasDeleted = await this.deleteRecordIntegrationRepository.deleteSectorOnCascade(sectorId);

        return datasDeleted;
    }
}