import { IActivityIntegrationRepository } from "../../repositories/IActivityIntegrationRepository";
export class GetRootNodeActivityTreeUseCase {
    constructor(private activityIntegrationRepository: IActivityIntegrationRepository) { }

    async execute(activityId: string) {
        const activityOrNull = await this.activityIntegrationRepository.findRootNodeById(activityId);
        if (!activityOrNull) {
            return new Error('Activity dont exists');
        }

        return activityOrNull;
    }
}