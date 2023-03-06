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
    getAllActivityByUser(userId: string): Promise<ICollectionActivityTreeFullInfo | Error>
}