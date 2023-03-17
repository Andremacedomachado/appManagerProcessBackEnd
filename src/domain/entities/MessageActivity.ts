
export enum TYPEMESSAGE {
    SYSTEM = 'SYSTEM',
    USER = 'USER'
}

export interface IMessageActivityProps {
    content: string,
    publication_date?: Date,
    updated_at?: Date,
    type_message: TYPEMESSAGE,
    user_id: string,
    activity_id: string
}

export class MessageActivity implements IMessageActivityProps {
    constructor(
        public content: string,
        public publication_date: Date,
        public updated_at: Date,
        public type_message: TYPEMESSAGE,
        public activity_id: string,
        public user_id: string) { }

    static create({ content, publication_date, updated_at, type_message, activity_id, user_id }: IMessageActivityProps) {
        return new MessageActivity(
            content,
            publication_date ?? new Date(),
            updated_at ?? new Date(),
            type_message,
            activity_id,
            user_id
        );
    }

}