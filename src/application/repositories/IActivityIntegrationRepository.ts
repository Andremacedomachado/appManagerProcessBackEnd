import { Activity, IActivityProps } from "../../domain/entities/Activity"
import { RecordCollaborator } from "../../domain/entities/RecordCollaborator"

export interface IActivityFullInfo extends Activity {
}

export interface IActivityTree {
    activities: IActivityFullInfo[],
    collaborators?: RecordCollaborator[]
}

export interface ICollectionActivityTreeFullInfo {
    collectionsActivityTree: IActivityTree[]
}

export interface IActivityIntegrationRepository {

    saveChange(): Promise<void>,
    getAllActivityByUser(userId: string): Promise<ICollectionActivityTreeFullInfo | Error>,
    findTreeDescendant(activityId: string): Promise<Activity[] | null>,
    findRootNodeById(activityId: string): Promise<Activity | null>,
    changeProcessStatusCascate(activityId: string): Promise<Error | null>
}