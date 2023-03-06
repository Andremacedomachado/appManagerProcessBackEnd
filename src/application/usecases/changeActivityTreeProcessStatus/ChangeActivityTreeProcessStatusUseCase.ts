import { IActivityRepository } from "../../repositories/IActivityRepository";


export class ChangeActivityTreeProcessStatusUseCase {
    constructor(private activityRepository: IActivityRepository) { }

    async execute(activityId: string) {
        const resultOperationOrError = await this.activityRepository.changeProcessStatusCascate(activityId);
        return resultOperationOrError;
    }
}