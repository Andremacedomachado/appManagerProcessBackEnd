import { IActivityIntegrationRepository } from "../../repositories/IActivityIntegrationRepository";

export class GetDescendantActivityTreeUsecase {
    constructor(private activityIntegrationRepository: IActivityIntegrationRepository) { }

    async execute(activityRootId: string) {
        const activityTreeOrNull = await this.activityIntegrationRepository.findTreeDescendant(activityRootId);
        if (!activityTreeOrNull) {
            return new Error('Activity not exists - report activity id exists')
        }
        return activityTreeOrNull;
    }
}