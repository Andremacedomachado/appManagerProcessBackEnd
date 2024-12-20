import { RecordDependency } from "../../../domain/entities/RecordDependency";
import { IActivityRelationRepository } from "../../repositories/IActivityRelationRepository";


export class GetActivityAdjacentUseCase {
    constructor(private activityRelationRepository: IActivityRelationRepository) { }
    async execute(activityId: string) {

        const activitiesAdjacent: RecordDependency[] = []
        const parentAdjacent = await this.activityRelationRepository.findByParentId(activityId)
        if (parentAdjacent && parentAdjacent.length > 0) {
            parentAdjacent.map(activityDependency => activitiesAdjacent.push(activityDependency))
        }

        const childrenAdjacent = await this.activityRelationRepository.findByChildrenId(activityId)
        if (childrenAdjacent && childrenAdjacent.length > 0) {
            childrenAdjacent.map(activityDependency => activitiesAdjacent.push(activityDependency))
        }
        return activitiesAdjacent


    }
}