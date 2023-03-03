import { ICollaboratorRepository } from "../../repositories/ICollaboratorReposytory";

export class GetCollaboratorByActivityUseCase {
    constructor(private collaboratorRepository: ICollaboratorRepository) { }

    async execute(activityId: string) {
        const recordsCollaboratorOrNull = await this.collaboratorRepository.findByActivityId(activityId);
        if (!recordsCollaboratorOrNull) {
            return new Error('Dont exists activity');
        }

        if (recordsCollaboratorOrNull.length == 0) {
            return new Error('Dont exists records');
        }

        return recordsCollaboratorOrNull;
    }
}