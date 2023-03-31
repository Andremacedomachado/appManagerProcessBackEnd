import { IActivityRelationRepository, IRecordDependecyIdProps } from "../../repositories/IActivityRelationRepository";

export class DeleteRecordDependencyUseCase {
    constructor(private activityRelationRepository: IActivityRelationRepository) { }

    async execute(recordId: IRecordDependecyIdProps) {
        const recordDeleted = await this.activityRelationRepository.delete(recordId);
        return recordDeleted
    }
}