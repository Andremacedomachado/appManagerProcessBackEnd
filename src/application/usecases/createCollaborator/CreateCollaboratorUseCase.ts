import { ICollaboratorRepository } from "../../repositories/ICollaboratorReposytory";
import { ICreateCollaboratorRequestDTO } from "./CreateCollaboratorDTO";

export class CreateCollaboratorUseCase {
    constructor(private collaboratorReository: ICollaboratorRepository) {
    }

    async execute(data: ICreateCollaboratorRequestDTO) {
        const { userIds, activityId } = data
        const resultSave = await this.collaboratorReository.save(userIds, activityId);
        return resultSave
    }
}