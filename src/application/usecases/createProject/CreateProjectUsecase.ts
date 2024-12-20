import { IProjectRepository } from "../../repositories/IProjectRepository";
import { CreateProjectRequestData } from "./CreateProjectDTO";


export class CreateProjectUseCase {
    constructor(private projectRepository: IProjectRepository) { }
    async execute(dataPayload: CreateProjectRequestData) {
        const projectCreated = await this.projectRepository.save(dataPayload)
        return projectCreated;
    }
}