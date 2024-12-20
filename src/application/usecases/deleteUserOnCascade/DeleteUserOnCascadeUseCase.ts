import { IDeleteRecordIntegrationRepository } from "../../repositories/IDeleteRecordIntegrationRepository";

export class DeleteUserOnCascadeUseCase {
    constructor(private deleteRecordIntegrationRepository: IDeleteRecordIntegrationRepository) { }

    async execute(userId:string) {
        const userDeletedOrError = await this.deleteRecordIntegrationRepository.deleteUserOnCascade(userId);
        return userDeletedOrError;
    }
}