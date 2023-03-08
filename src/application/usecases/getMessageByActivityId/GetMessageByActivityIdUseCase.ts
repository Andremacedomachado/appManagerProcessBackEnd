import { IMessagaActivityRepository } from "../../repositories/IMessageActivityRepository";

export class GetMessageByActivityIdUseCase {
    constructor(private messageActivityRepository: IMessagaActivityRepository) { }

    async execute(activityId: string) {
        const collectionMessageActivityOrNull = await this.messageActivityRepository.findByAtivityId(activityId);
        if (!collectionMessageActivityOrNull) {
            return new Error('Activity dont exists!');
        }
        return collectionMessageActivityOrNull
    }
}