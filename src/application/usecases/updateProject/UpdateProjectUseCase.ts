import { IProjectRepository } from "../../repositories/IProjectRepository";
import { UpdateProjectRequestData } from "./UpdateProjectDTO";

export class UpdateProjectUseCase {
    constructor(private projectRepository: IProjectRepository) { }

    async execute(authId: string, payload: UpdateProjectRequestData) {
        const { id, ...props } = payload
        const project = await this.projectRepository.update(id, props)
        return project
    }

}