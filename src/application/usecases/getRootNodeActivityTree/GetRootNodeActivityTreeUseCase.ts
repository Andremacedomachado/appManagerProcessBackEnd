import { IActivityRepository } from "../../repositories/IActivityRepository";

export class GetRootNodeActivityTreeUseCase {
    constructor(private activityRepository: IActivityRepository) { }

    async execute(activityId: string) {
        const activityOrNull = await this.activityRepository.findRootNodeById(activityId);
        if (!activityOrNull) {
            return new Error('Activity dont exists');
        }

        return activityOrNull;
    }
}