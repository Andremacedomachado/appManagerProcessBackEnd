import { IMessageActivityRepository } from "../../repositories/IMessageActivityRepository";

export class DeleteMessageActivityByActivityUseCase {
    constructor(private messageActivityRepository: IMessageActivityRepository) { }

    async execute(activityId: string) {
        const messagesDeletedOrError = await this.messageActivityRepository.deleteCollectionRecordsByActivityId(activityId)
        return messagesDeletedOrError;
    }
}