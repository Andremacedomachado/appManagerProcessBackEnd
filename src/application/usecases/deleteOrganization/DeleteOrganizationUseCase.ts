import { IOrganizationRepository } from "../../repositories/IOrganizationRepository";
import { IOrganizationSectorRepository } from "../../repositories/IOrganizationSectorRepository";

export class DeleteOrganizationUseCase {
    constructor(
        private organizationRepository: IOrganizationRepository,
        private organizationSectorRepository: IOrganizationSectorRepository) {
    }

    async execute(organizationId: string) {
        const organizationlinkSectors = await this.organizationSectorRepository.findSectorsByOrganizationId(organizationId)

        if (organizationlinkSectors.length > 0) {
            return new Error('Organization of sectors connected to it - invalid operation')
        }
        const organizationDeletedOrError = await this.organizationRepository.delete(organizationId)
        return organizationDeletedOrError
    }
}