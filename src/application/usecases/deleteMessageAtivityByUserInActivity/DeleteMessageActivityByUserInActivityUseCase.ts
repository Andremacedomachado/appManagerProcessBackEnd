import { IFilterMessageByUserActivityProps, IMessageActivityRepository } from "../../repositories/IMessageActivityRepository";

export class DeleteMessageActivityByUserInActivityUseCase {
    constructor(private messageActivityRepository: IMessageActivityRepository) {
    }

    async execute(filter: IFilterMessageByUserActivityProps) {
        const messageDeletedOrError = await this.messageActivityRepository.deleteCollectionRecordsByUserIdAndActivityId(filter);
        return messageDeletedOrError;
    }
}