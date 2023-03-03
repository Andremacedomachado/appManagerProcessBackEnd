import { ICollaboratorRepository } from "../../repositories/ICollaboratorReposytory";

export class GetCollaboratorByUserUseCase {
    constructor(private collaboratorRepository: ICollaboratorRepository) { }

    async execute(userId: string) {
        const recordsCollaboratorOrNull = await this.collaboratorRepository.findByUserId(userId);
        if (!recordsCollaboratorOrNull) {
            return new Error('User dont exists!');
        }

        if (recordsCollaboratorOrNull.length == 0) {
            return new Error('Records dont exists!')
        }

        return recordsCollaboratorOrNull;
    }
}