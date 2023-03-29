import { IMessagaActivityRepository } from "../../repositories/IMessageActivityRepository";

export class DeleteAllMessageActivityByUserUseCase {
    constructor(private messageActivityRepository: IMessagaActivityRepository) { }

    async execute(userId: string) {
        const collectionMessageDeletedOrError = this.messageActivityRepository.deleteCollectionRecordsByUserId(userId);
        return collectionMessageDeletedOrError
    }
}