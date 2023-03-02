import { IActivityRepository } from "../../repositories/IActivityRepository";

export class GetDescendantActivityTreeUsecase {
    constructor(private activityRepository: IActivityRepository) { }

    async execute(activityRootId: string) {
        const activityTreeOrNull = await this.activityRepository.findTreeDescendant(activityRootId);
        if (!activityTreeOrNull) {
            return new Error('Activity not exists - report activity id exists')
        }
        return activityTreeOrNull;
    }
}