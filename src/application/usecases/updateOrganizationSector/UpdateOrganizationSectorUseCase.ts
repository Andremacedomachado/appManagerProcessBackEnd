import { IOrganizationSectorRepository } from "../../repositories/IOrganizationSectorRepository";
import { UpdateOrganizationSectorFormData } from "./UpdateOrganizationSectorDTO";

export class UpdateOrganizationSectorUseCase {
    constructor(private organizationSectorRepository: IOrganizationSectorRepository) { }

    async execute(dataPayload: UpdateOrganizationSectorFormData) {
        return await this.organizationSectorRepository.update(dataPayload)
    }
}