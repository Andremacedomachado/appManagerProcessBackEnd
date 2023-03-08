import { IMessagaActivityRepository } from "../../repositories/IMessageActivityRepository";
import { IUpdateMessageActivityRequestDTO } from "./UpdateMessageActivityDTO";

export class UpdateMessageActivityUseCase {
    constructor(private messageActivityRepository: IMessagaActivityRepository) { }

    async execute(messageDataUpdates: IUpdateMessageActivityRequestDTO) {
        const { content, publication_date, type_message, activity_id, user_id, updated_at } = messageDataUpdates
        const messageUpdatedOrNull = await this.messageActivityRepository.update({
            content,
            type_message,
            updated_at,
            activity_id,
            user_id,
            publication_date,
        })

        if (!messageUpdatedOrNull) {
            return new Error('Failed to update message!');
        }

        return messageUpdatedOrNull
    }
}