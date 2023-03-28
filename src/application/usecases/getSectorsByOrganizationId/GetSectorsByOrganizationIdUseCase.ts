
import { IOrganizationSectorRepository } from "../../repositories/IOrganizationSectorRepository";

export class GetSectorsByOrganizationIdUseCase {
    constructor(private organizationSectorRepository: IOrganizationSectorRepository) {
    }

    async execute(organizationId: string) {
        const sectors = await this.organizationSectorRepository.findSectorsByOrganizationId(organizationId);
        return sectors
    }
}