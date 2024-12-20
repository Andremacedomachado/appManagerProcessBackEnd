import { isAfter } from "date-fns";
import { IRecordDependencyProps, RecordDependency } from "../../../domain/entities/RecordDependency";
import { IActivityRelationRepository } from "../../repositories/IActivityRelationRepository";
import { IActivityRepository } from "../../repositories/IActivityRepository";

export class CreateRecordDependencyUseCase {
    constructor(private activityRelationRepository: IActivityRelationRepository, private activityRepository: IActivityRepository) { }

    async execute(recordDependecy: IRecordDependencyProps) {
        if (recordDependecy.parent_id == recordDependecy.children_id) {
            return new Error('Activity cannot self-reference');
        }

        const activityParentExist = await this.activityRepository.findById(recordDependecy.parent_id);
        if (!activityParentExist) {
            return new Error('Activity not exist - impossible save record dependecy')
        }
        const activityChildrenExist = await this.activityRepository.findById(recordDependecy.children_id);
        if (!activityChildrenExist) {
            return new Error('Activity not exist - impossible save record dependecy')
        }

        const precendenceInValid = !activityParentExist.verifyPrecedenceValid(activityChildrenExist)
        if (precendenceInValid) {
            return new Error('invalid precedence between successor and predecessor activity - link only activities with later dates')
        }
        const activityInsert = RecordDependency.create(recordDependecy)
        const activityOrNull = await this.activityRelationRepository.save(activityInsert);
        if (!activityOrNull) {
            return new Error('Dependecy already exists');
        }
        return activityOrNull;
    }
}