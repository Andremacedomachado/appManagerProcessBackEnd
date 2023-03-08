import { IMessagaActivityRepository } from "../../repositories/IMessageActivityRepository";

export class GetMessageByUserIdUseCase {
    constructor(private messageActivityRepository: IMessagaActivityRepository) { }

    async execute(userId: string) {
        const collectionMessageActivityOrNull = await this.messageActivityRepository.findByUserId(userId);
        if (!collectionMessageActivityOrNull) {
            return new Error('User dont exists!');
        }
        return collectionMessageActivityOrNull
    }
}