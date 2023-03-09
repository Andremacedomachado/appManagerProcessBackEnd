import { AnnexActivity } from "../../../domain/entities/AnnexActivity";
import { IAnnexActivityRepository } from "../../repositories/IAnnexActivityRepository";
import { ICreateAnnexActivityRequestDTO } from "./CreateAnnexActivityDTO";

export class CreateAnnexActivityUseCase {
    constructor(private annexActivityRepository: IAnnexActivityRepository) { }

    async execute(annexActivityData: ICreateAnnexActivityRequestDTO) {
        const annexActivity = AnnexActivity.create(annexActivityData);
        const annexActivityIdOrNull = await this.annexActivityRepository.save(annexActivity);
        if (!annexActivityIdOrNull) {
            return new Error('Error on save data in database!');
        }
        return annexActivityIdOrNull;
    }
}