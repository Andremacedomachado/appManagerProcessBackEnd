import { IAnnexActivityRepository, IFilterAnnexActivityProps } from "../../repositories/IAnnexActivityRepository";

export class DeleteAllAnnexActivtyByUserUseCase {
    constructor(private annexActivityRepository: IAnnexActivityRepository) { }

    async execute(filter: IFilterAnnexActivityProps) {
        const annexsActivity = await this.annexActivityRepository.deleteRecordsByfilter(filter);
        return annexsActivity
    }
}