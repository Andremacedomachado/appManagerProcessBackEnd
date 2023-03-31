import { IActivityRepository } from "../../repositories/IActivityRepository";
import { IDeleteRecordIntegrationRepository } from "../../repositories/IDeleteRecordIntegrationRepository";

export class DeleteActivityUseCase {
    constructor(private activityRepository: IActivityRepository) { }

    async execute(activityId: string) {
        const activityOrError = await this.activityRepository.delete(activityId)
        return activityOrError;
    }
}