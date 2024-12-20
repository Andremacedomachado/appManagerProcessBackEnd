import { IActivityRepository } from "../../repositories/IActivityRepository";
import { GetActivityRequestData, IGetActivityRequestDTO } from "./GetActivityDTO";

export class GetActivityUseCase {
    constructor(private activityRepository: IActivityRepository) { }

    async execute(dataSearch: GetActivityRequestData) {
        return await this.activityRepository.findMany(dataSearch);
    }
}