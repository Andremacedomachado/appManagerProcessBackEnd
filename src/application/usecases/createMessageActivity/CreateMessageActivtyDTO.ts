
export interface ICreateMessageActivityRequestDTO {
    content: string;
    publication_date?: Date;
    updated_at?: Date;
    typeMessage: string;
    userId: string;
    activityId: string;
}