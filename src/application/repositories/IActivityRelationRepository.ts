import { RecordDependency } from "../../domain/entities/RecordDependency";

export interface IRecordDependecyIdProps {
    parent_id: string,
    children_id: string,
}

export interface IActivityRelationRepository {
    save(recordDependency: RecordDependency): Promise<RecordDependency | null>,
    findByParentId(parent_id: string): Promise<RecordDependency[] | null>,
    findByChildrenId(children_id: string): Promise<RecordDependency[] | null>,
    delete(recordId: IRecordDependecyIdProps): Promise<RecordDependency | Error>,
    deleteByCorrelationId(searchId: string): Promise<RecordDependency[] | Error>,
}