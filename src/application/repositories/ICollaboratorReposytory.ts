import { IRecordCollaboratorProps, RecordCollaborator } from "../../domain/entities/RecordCollaborator"

export interface ICollaboratorRepository {

    save(userIds: string[], activityId: string): Promise<null | Error>
    replaceAll(userIds: string[], activityId: string): Promise<null | Error>
    findByUserId(userId: string): Promise<RecordCollaborator[] | null>
    findByActivityId(activityId: string): Promise<RecordCollaborator[] | null>
    findAll(): Promise<RecordCollaborator[] | null>
    delete(recordCollaborator: IRecordCollaboratorProps): Promise<RecordCollaborator | Error>
}