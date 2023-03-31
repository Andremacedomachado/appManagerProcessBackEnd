import { IActivityRelationRepository } from "../../repositories/IActivityRelationRepository";

export class DeleteRecordDependencyByCorrelationUseCase {
    constructor(private activityRelationRepository: IActivityRelationRepository) { }

    async execute(searchId: string) {
        const recordDeletedOrError = await this.activityRelationRepository.deleteByCorrelationId(searchId);
        return recordDeletedOrError;
    }
}