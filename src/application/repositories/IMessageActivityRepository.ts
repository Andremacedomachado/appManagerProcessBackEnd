import { IMessageActivityProps, MessageActivity, TYPEMESSAGE } from "../../domain/entities/MessageActivity";

export type IMessageActivityUpdateProps = {
    content?: string,
    publication_date: Date,
    updated_at?: Date,
    type_message?: TYPEMESSAGE,
    activity_id: string,
    user_id: string
}

export interface IRecordMessageIdProps {
    activity_id: string,
    user_id: string,
    publication_date: Date,
}

export interface IFilterMessageByUserActivityProps {
    activity_id: string,
    user_id: string,
}

export interface IMessageActivityRepository {
    save(message: MessageActivity): Promise<IRecordMessageIdProps | null>,
    findAll(): Promise<MessageActivity[] | null>,
    findOne(messageId: IRecordMessageIdProps): Promise<MessageActivity | null>,
    findManyByMessageContent(messageContent: string): Promise<MessageActivity[] | null>,
    findByAtivityId(activityId: string): Promise<MessageActivity[] | null>,
    findByUserId(userId: string): Promise<MessageActivity[] | null>,
    update(messageUpdate: IMessageActivityUpdateProps): Promise<MessageActivity | null>,
    delete(messageId: IRecordMessageIdProps): Promise<MessageActivity | null>,
    deleteCollectionRecordsByUserId(userId: string): Promise<MessageActivity[] | Error>,
    deleteCollectionRecordsByActivityId(activityId: string): Promise<MessageActivity[] | Error>,
    deleteCollectionRecordsByUserIdAndActivityId(filter: IFilterMessageByUserActivityProps): Promise<MessageActivity[] | Error>,
}