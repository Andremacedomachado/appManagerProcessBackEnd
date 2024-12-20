import { IOrganizationRepository } from "../../repositories/IOrganizationRepository";
import { UpdateOrganizationFormData } from "./UpdateOrganizationDTO";


export class UpdateOrganizationUseCase {
    constructor(private organizationRepository: IOrganizationRepository) { }

    async execute(dataToUpdate: UpdateOrganizationFormData) {
        const organizationOrNull = await this.organizationRepository.update(dataToUpdate)
        return organizationOrNull;
    }
}