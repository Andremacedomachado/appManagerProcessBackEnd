import { IMessageActivityRepository } from "../../repositories/IMessageActivityRepository";

export class GetAllMessageActivityUseCase {
    constructor(private messageActivityRepository: IMessageActivityRepository) { }

    async execute() {
        const collectionMessageActivityOrNull = await this.messageActivityRepository.findAll();
        if (!collectionMessageActivityOrNull) {
            return new Error('there is no activity in the database!');
        }
        return collectionMessageActivityOrNull
    }
}