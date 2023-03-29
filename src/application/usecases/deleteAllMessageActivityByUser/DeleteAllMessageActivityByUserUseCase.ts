import { IMessageActivityRepository } from "../../repositories/IMessageActivityRepository";

export class DeleteAllMessageActivityByUserUseCase {
    constructor(private messageActivityRepository: IMessageActivityRepository) { }

    async execute(userId: string) {
        const collectionMessageDeletedOrError = this.messageActivityRepository.deleteCollectionRecordsByUserId(userId);
        return collectionMessageDeletedOrError
    }
}