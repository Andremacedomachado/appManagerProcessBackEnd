import { AnnexActivity } from "../../domain/entities/AnnexActivity";

export interface IAnnexActivityUnique {
    publication_date: Date,
    original_name: string
}

export interface IAnnexActivityIdProps {
    publication_date: Date,
    activity_id: string,
    user_id: string
}

export type IFilterAnnexActivityProps = {
    publication_date?: Date,
    user_id?: string,
    activity_id?: string,
}

export interface IAnnexActivityRepository {
    save(annexAtivity: AnnexActivity): Promise<IAnnexActivityIdProps | null>,
    findAll(): Promise<AnnexActivity[] | null>,
    findOne(dataSearchAnnex: IAnnexActivityUnique): Promise<AnnexActivity | null>
    findManyByActivityId(activityId: string): Promise<AnnexActivity[] | null>,
    findManyByUserId(userId: string): Promise<AnnexActivity[] | null>,
    delete(dataSearchAnnex: IAnnexActivityIdProps): Promise<AnnexActivity>,
    deleteRecordsByfilter(filter: IFilterAnnexActivityProps): Promise<AnnexActivity[] | Error>,
}