import { IOrganizationSectorRepository } from "../../repositories/IOrganizationSectorRepository";

export class GetAllOrganizationSectorUseCase {

    constructor(private organizationSectorRepository: IOrganizationSectorRepository) { }

    async execute() {
        const sectors = await this.organizationSectorRepository.findAll();
        if (!sectors) {
            return new Error('Not exists records of Sectors in database');
        }
        return sectors;
    }
}