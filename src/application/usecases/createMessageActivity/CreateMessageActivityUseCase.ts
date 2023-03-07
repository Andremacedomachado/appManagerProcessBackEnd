import { MessageActivity, TYPEMESSAGE } from "../../../domain/entities/MessageActivity";
import { IMessagaActivityRepository } from "../../repositories/IMessageActivityRepository";
import { ICreateMessageActivityRequestDTO } from "./CreateMessageActivtyDTO";

export class CreateMessageActivityUseCase {
    constructor(private messageActivityRepository: IMessagaActivityRepository) { }

    async execute(messageData: ICreateMessageActivityRequestDTO) {
        const messageActivityInMemory = MessageActivity.create({
            content: messageData.content,
            publication_date: messageData.publication_date ?? new Date(),
            updated_at: messageData.updated_at ?? new Date(),
            type_message: messageData.typeMessage as unknown as TYPEMESSAGE,
            activity_id: messageData.activityId,
            user_id: messageData.userId
        })
        const messageIdOrNull = await this.messageActivityRepository.save(messageActivityInMemory);
        if (!messageIdOrNull) {
            return new Error('activity or user not exists!');
        }
        return messageIdOrNull;
    }
}