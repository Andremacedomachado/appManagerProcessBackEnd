import { IActivityRepository } from "../../repositories/IActivityRepository";

export class GetAllActivityUseCase {
    constructor(private activityRepository: IActivityRepository) { }
    async execute() {
        const activitiesOrNull = await this.activityRepository.findAll();

        if (!activitiesOrNull) {
            return new Error('Not exists Activities inserted')
        }
        return activitiesOrNull;
    }
}