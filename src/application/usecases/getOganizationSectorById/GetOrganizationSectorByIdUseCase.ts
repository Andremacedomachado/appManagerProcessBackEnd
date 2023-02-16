import { IOrganizationSectorRepository } from "../../repositories/IOrganizationSectorRepository";


export class GetOrganizationSectorByIdUseCase {
    constructor(private organizationSectorRepository: IOrganizationSectorRepository) { }

    async execute(sectorId: string) {
        const sector = await this.organizationSectorRepository.findById(sectorId);
        if (!sector) {
            return new Error('Sector not exists');
        }
        return sector;
    }
}