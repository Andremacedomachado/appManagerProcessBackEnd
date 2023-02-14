
export interface IRecordRoleProps {
    user_id: string,
    role_id: string,
    created_at: Date,
    adjuster_id: string
}
export class RecordRole implements IRecordRoleProps {
    constructor(
        public user_id: string,
        public role_id: string,
        public created_at: Date,
        public adjuster_id: string,
    ) {
    }

    static create({ user_id, role_id, created_at, adjuster_id }: IRecordRoleProps): RecordRole {

        const recordRole = new RecordRole(user_id, role_id, created_at, adjuster_id);
        return recordRole;
    }
}