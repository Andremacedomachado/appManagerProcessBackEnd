import { IOrganizationRepository } from "../../repositories/IOrganizationRepository";


export class GetOrganizationByIdUseCase {

    constructor(private organizationRepository: IOrganizationRepository) { }

    async execute(organizationId: string) {
        const organization = await this.organizationRepository.findById(organizationId);
        if (!organization) {
            return new Error('Organization not exists');
        }
        return organization;
    }
}