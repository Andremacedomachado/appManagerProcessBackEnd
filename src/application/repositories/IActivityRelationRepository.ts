import { RecordDependency } from "../../domain/entities/RecordDependency";

export interface IRecordDependecyIdProps {
    parent_id: string,
    children_id: string,
}

export interface IActivityRelationRepository {
    save(recordDependency: RecordDependency): Promise<IRecordDependecyIdProps | null>,
    findByParentId(parent_id: string): Promise<RecordDependency[] | null>,
    findByChildrenId(children_id: string): Promise<RecordDependency[] | null>,
    delete(recordDependency: RecordDependency): Promise<RecordDependency | null>,
    deleteByCorrelationId(searchId: string): Promise<Error | null | number>,
}