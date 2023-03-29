import { IMessageActivityRepository, IRecordMessageIdProps } from "../../repositories/IMessageActivityRepository";

export class DeleteMessageActivityUseCase {
    constructor(private messageActivityRepository: IMessageActivityRepository) { }

    async execute(messageId: IRecordMessageIdProps) {
        const messageDeletedOrNull = await this.messageActivityRepository.delete(messageId)
        if (!messageDeletedOrNull) {
            return new Error('Message not exist');
        }
        return messageDeletedOrNull
    }
}