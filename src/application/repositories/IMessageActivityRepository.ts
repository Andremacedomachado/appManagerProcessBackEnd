import { IMessageActivityProps, MessageActivity } from "../../domain/entities/MessageActivity";

export type IMessageActivityUpdateProps = {
    content?: string,
    publication_date: Date,
    updated_at?: Date,
    type_message?: string,
    activity_id: string,
    user_id: string
}

export interface IRecordMessageIdProps {
    activity_id: string,
    user_id: string,
    publication_date: Date,
}

export interface IMessagaActivityRepository {
    save(message: MessageActivity): Promise<IRecordMessageIdProps | null>,
    findAll(): Promise<MessageActivity[] | null>,
    findOne(messageId: IRecordMessageIdProps): Promise<MessageActivity | null>;
    findManyByMessageContent(messageContent: string): Promise<MessageActivity[] | null>,
    findByAtivityId(activityId: string): Promise<MessageActivity[] | null>,
    findByUserId(userId: string): Promise<MessageActivity[] | null>,
    update(messageUpdate: IMessageActivityUpdateProps): Promise<MessageActivity | null>,
}