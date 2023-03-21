import { IUserIntegrationRepository } from "../../repositories/IUserIntegrationRepository";

export class GetAllUserByOrganizationUseCase {
    constructor(private userIntegrationRepository: IUserIntegrationRepository) {
    }
    async execute(organizationId: string) {
        const usersOrError = await this.userIntegrationRepository.getAllUserByOrganization(organizationId);
        return usersOrError;
    }
}