import { IActivityIntegrationRepository } from "../../repositories/IActivityIntegrationRepository";

export class GetALLActivityTreeByUserUseCase {
    constructor(private activityIntegrationRepository: IActivityIntegrationRepository) { }

    async execute(userId: string) {
        const collectionActivityTreeOrError = await this.activityIntegrationRepository.getAllActivityByUser(userId);
        return collectionActivityTreeOrError;
    }
}