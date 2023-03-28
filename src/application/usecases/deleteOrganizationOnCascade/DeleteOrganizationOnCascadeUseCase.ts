import { IDeleteRecordIntegrationRepository } from "../../repositories/IDeleteRecordIntegrationRepository"


export class DeleteOrganizationOnCascadeUseCase {
    constructor(private deleteRecordIntegrationRepository: IDeleteRecordIntegrationRepository) { }

    async execute(organizationId: string) {

        const datasDeleted = await this.deleteRecordIntegrationRepository.deleteOrganizationOnCascade(organizationId);

        return datasDeleted;
    }
}