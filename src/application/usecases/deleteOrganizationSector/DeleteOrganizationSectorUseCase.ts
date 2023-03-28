import { IOrganizationSectorRepository } from "../../repositories/IOrganizationSectorRepository";
import { IUserIntegrationRepository } from "../../repositories/IUserIntegrationRepository";

export class DeleteOrganizationSectorUseCase {
    constructor(
        private userintegrationRepository: IUserIntegrationRepository,
        private organizationSectorRepository: IOrganizationSectorRepository
    ) { }

    async execute(sectorId: string) {
        const sectorExist = await this.organizationSectorRepository.findById(sectorId);
        if (!sectorExist) {
            return new Error('Sector not exits');
        }

        const usersOrError = await this.userintegrationRepository.getAllUserBySector(sectorId)

        if (usersOrError instanceof Error) {
            return usersOrError
        }

        if (usersOrError.length > 0) {
            return new Error('sector has users connected to it - invalid operation')
        }

        const sectorDeleted = await this.organizationSectorRepository.delete(sectorId)
        return sectorDeleted
    }
}