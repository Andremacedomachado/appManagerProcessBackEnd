import { MessageActivity, TYPEMESSAGE } from "../../../domain/entities/MessageActivity";
import { IMessageActivityRepository } from "../../repositories/IMessageActivityRepository";
import { ICreateMessageActivityRequestDTO } from "./CreateMessageActivtyDTO";

export class CreateMessageActivityUseCase {
    constructor(private messageActivityRepository: IMessageActivityRepository) { }

    async execute({ content, activity_id, type_message, user_id, publication_date, updated_at }: ICreateMessageActivityRequestDTO) {
        const messageActivityInMemory = MessageActivity.create({
            content,
            publication_date,
            updated_at,
            type_message,
            activity_id,
            user_id
        })
        const messageIdOrNull = await this.messageActivityRepository.save(messageActivityInMemory);
        if (!messageIdOrNull) {
            return new Error('activity or user not exists!');
        }
        return messageIdOrNull;
    }
}