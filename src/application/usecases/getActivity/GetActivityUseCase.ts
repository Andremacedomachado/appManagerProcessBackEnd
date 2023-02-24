import { IActivityRepository } from "../../repositories/IActivityRepository";
import { IGetActivityRequestDTO } from "./GetActivityDTO";

export class GetActivityUseCase {
    constructor(private activityRepository: IActivityRepository) { }

    async execute(dataSearch: IGetActivityRequestDTO) {
        const activityOrNull = await this.activityRepository.findByTitle(dataSearch.title);

        if (!activityOrNull) {
            return new Error('Activity not found or not exists');
        };

        return activityOrNull;
    }
}