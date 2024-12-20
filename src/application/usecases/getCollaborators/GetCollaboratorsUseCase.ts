import { ICollaboratorRepository } from "../../repositories/ICollaboratorReposytory";
import { GetCollaboratorsData } from "./GetCollaboratorsDTO";

export class GetCollaboratorsUseCase {
    constructor(private collaboratorRepository: ICollaboratorRepository) { }

    async execute(query: GetCollaboratorsData) {
        return await this.collaboratorRepository.findMany(query)
    }
}