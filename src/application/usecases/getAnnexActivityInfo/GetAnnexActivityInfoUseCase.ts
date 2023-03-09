import { IAnnexActivityRepository } from "../../repositories/IAnnexActivityRepository";
import { IGetAnnexActivityInfoRequestDTO } from "./GetAnnexActivityInfoDTO";

export class GetAnnexActivityInfoUseCase {
    constructor(private annexActivityRepository: IAnnexActivityRepository) { }

    async execute(dataSeachAnnex: IGetAnnexActivityInfoRequestDTO) {
        const annexActivityInfoOrNull = await this.annexActivityRepository.findOne(dataSeachAnnex);
        if (!annexActivityInfoOrNull) {
            return new Error('Annex not exists!');
        }
        return annexActivityInfoOrNull;
    }
}