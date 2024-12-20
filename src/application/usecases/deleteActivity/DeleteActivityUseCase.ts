import { IActivityRepository } from "../../repositories/IActivityRepository";
export class DeleteActivityUseCase {
    constructor(private activityRepository: IActivityRepository) { }

    async execute(activityId: string) {
        const activityOrError = await this.activityRepository.delete(activityId)
        return activityOrError;
    }
}