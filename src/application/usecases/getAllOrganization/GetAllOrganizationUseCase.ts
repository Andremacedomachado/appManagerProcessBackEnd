import { IOrganizationRepository } from "../../repositories/IOrganizationRepository";



export class GetAllOrganizationUseCase {
    constructor(private organizationRepository: IOrganizationRepository) { }

    async execute() {
        const organizations = await this.organizationRepository.findAll();

        if (!organizations) {
            return new Error('Not exits organization in database');
        }

        return organizations;
    }
}