import { IActivityRepository } from "../../repositories/IActivityRepository";
import { IGetActivityByIdRequestDTO } from "./GetActivityDTO";

export class GetActivityByIdUseCase {
    constructor(private activityRepository: IActivityRepository) { }

    async execute(dataSearch: IGetActivityByIdRequestDTO) {
        const activityOrNull = await this.activityRepository.findById(dataSearch.activityId);

        if (!activityOrNull) {
            return new Error('Activity not found or not exists');
        };

        return activityOrNull;
    }
}