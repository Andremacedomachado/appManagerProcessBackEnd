import { ICollaboratorRepository, IFilterCollaboratorProps } from "../../repositories/ICollaboratorReposytory";

export class DeleteAllCollboratorByUserUseCase {
    constructor(private collaboratorRepository: ICollaboratorRepository) { }

    async execute(filter: IFilterCollaboratorProps) {
        const collectionCollaboratorDeletedOrError = await this.collaboratorRepository.deleteMany(filter);
        return collectionCollaboratorDeletedOrError;
    }
}