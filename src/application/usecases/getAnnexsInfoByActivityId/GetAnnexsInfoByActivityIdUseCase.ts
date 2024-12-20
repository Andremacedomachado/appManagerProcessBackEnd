import { IAnnexActivityRepository } from "../../repositories/IAnnexActivityRepository";
import { GetAnnexsInfoByActivityIdRequestDTO } from "./GetAnnexsInfoByActivityIdDTO";


export class GetAnnexsInfoByActivityIdUsecase {
    constructor(private annexActivityRepository: IAnnexActivityRepository) { }

    async execute({ activityId }: GetAnnexsInfoByActivityIdRequestDTO) {
        return await this.annexActivityRepository.findManyByActivityId(activityId)
    }
}