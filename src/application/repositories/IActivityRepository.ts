import { Activity, IActivityProps, IActivityUpdateProps } from "../../domain/entities/Activity";

export interface IActivityId {
    id: string
}

export interface IActivityUniqueContentProps {
    title: string,
    created_at: Date,
}


export type KeysActivityFields = Array<keyof (IActivityProps & { id: string })>

export interface IActivityQuery {
    keys: KeysActivityFields,
    values: Array<string | Date | null>
}
export interface IActivityRepository {
    save(activity: Activity): Promise<IActivityId>,
    findById(activityId: string): Promise<Activity | null>,
    findAll(): Promise<Activity[]>,
    findByTitle(titleSearch: string): Promise<Activity | null>,
    findUniqueForcontent(dataSearch: IActivityUniqueContentProps): Promise<Activity | null>,
    update(activity: IActivityUpdateProps): Promise<Activity>,
    delete(activityId: string): Promise<Activity | Error>,
    findMany(query: IActivityQuery | undefined): Promise<Activity[]>,
}