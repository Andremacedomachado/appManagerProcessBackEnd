

import { IUserIntegrationRepository } from "../../repositories/IUserIntegrationRepository";


export class GetUserByIdUseCase {
    constructor(
        private userIntegrationRepository: IUserIntegrationRepository,
    ) {
    }

    async excute(userId: string) {
        const user = await this.userIntegrationRepository.getFullInfoUser(userId)

        return user;
    }
}