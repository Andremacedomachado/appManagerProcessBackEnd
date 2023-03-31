import { IRecordDependencyProps, RecordDependency } from "../../../domain/entities/RecordDependency";
import { IActivityRelationRepository } from "../../repositories/IActivityRelationRepository";

export class CreateRecordDependencyUseCase {
    constructor(private activityRelationRepository: IActivityRelationRepository) { }

    async execute(recordDependecy: IRecordDependencyProps) {
        if (recordDependecy.parent_id == recordDependecy.children_id) {
            return new Error('Activity cannot self-reference');
        }
        const activityInsert = RecordDependency.create(recordDependecy)
        const activityOrNull = await this.activityRelationRepository.save(activityInsert);
        if (!activityOrNull) {
            return new Error('Dependecy already exists');
        }
        return activityOrNull;
    }
}