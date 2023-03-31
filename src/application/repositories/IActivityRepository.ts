import { Activity, IActivityProps } from "../../domain/entities/Activity";

export interface IActivityId {
    id: string
}
export interface IActivityUpdateProps extends IActivityProps {
    id: string
}
export interface IActivityUniqueContentProps {
    title: string,
    created_at: Date,
}

export interface IActivityRepository {
    save(activity: Activity): Promise<IActivityId | null>,
    findById(activityId: string): Promise<Activity | null>,
    findAll(): Promise<Activity[] | null>,
    findByTitle(titleSearch: string): Promise<Activity | null>,
    findUniqueForcontent(dataSearch: IActivityUniqueContentProps): Promise<Activity | null>,
    update(activity: IActivityProps): Promise<Activity | null>,
    delete(activityId: string): Promise<Activity | Error>,
}