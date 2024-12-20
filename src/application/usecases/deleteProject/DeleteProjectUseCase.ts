import { IProjectRepository } from "../../repositories/IProjectRepository";
import { DeleteProjectRequestData } from "./DeleteProjectDTO";

export class DeleteProjectUseCase {
    constructor(
        private projectRepository: IProjectRepository
    ) { }

    async execute(payload: DeleteProjectRequestData) {
        const projectDeleted = await this.projectRepository.delete(payload.id)
        return projectDeleted
    }
}