import { IDeleteRecordIntegrationRepository } from "../../repositories/IDeleteRecordIntegrationRepository";

export class DeleteActivityOnCascadeUseCase {
    constructor(private deleteRecordIntegrationRepository: IDeleteRecordIntegrationRepository) { }

    async execute(activityId: string) {
        const activityDeletedOrError = await this.deleteRecordIntegrationRepository.deleteActivityOnCascade(activityId)
        return activityDeletedOrError
    }
}