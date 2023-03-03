
export interface IRecordCollaboratorProps {
    user_id: string;
    activity_id: string;
}

export class RecordCollaborator implements IRecordCollaboratorProps {
    constructor(public user_id: string, public activity_id: string) {
    }

    static create({ user_id, activity_id }: IRecordCollaboratorProps): RecordCollaborator {
        return new RecordCollaborator(user_id, activity_id);
    }
}