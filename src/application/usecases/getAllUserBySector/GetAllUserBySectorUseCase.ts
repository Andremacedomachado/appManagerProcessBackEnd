import { IUserIntegrationRepository } from "../../repositories/IUserIntegrationRepository";

export class GetAllUserBySectorUseCase {
    constructor(private userIntegrationRepository: IUserIntegrationRepository) { }

    async execute(sectorId: string) {
        const usersOrError = await this.userIntegrationRepository.getAllUserBySector(sectorId);
        return usersOrError
    }
}