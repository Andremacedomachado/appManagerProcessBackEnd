import { IRecordCollaboratorProps } from "../../../domain/entities/RecordCollaborator";
import { ICollaboratorRepository } from "../../repositories/ICollaboratorReposytory";

export class DeleteCollaboratorUseCase {
    constructor(private collaboratorRepository: ICollaboratorRepository) { }

    async execute(dataDelete: IRecordCollaboratorProps) {
        const collaborationDeleted = await this.collaboratorRepository.delete(dataDelete);
        return collaborationDeleted;
    }
}