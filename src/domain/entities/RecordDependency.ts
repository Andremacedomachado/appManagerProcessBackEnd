
export interface IRecordDependencyProps {
    parent_id: string,
    children_id: string,
    dependency_linked_date?: Date
}
export class RecordDependency implements IRecordDependencyProps {
    constructor(
        public parent_id: string,
        public children_id: string,
        public dependency_linked_date?: Date
    ) {
        this.dependency_linked_date = dependency_linked_date ? dependency_linked_date : new Date();
    }

    static create({ children_id, dependency_linked_date, parent_id }: IRecordDependencyProps) {
        return new RecordDependency(parent_id, children_id, dependency_linked_date);
    }
}