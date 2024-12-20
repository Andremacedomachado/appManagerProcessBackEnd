import { IProjectRepository } from "../../repositories/IProjectRepository";
import { GetProjectRequestData } from "./GetProjectDTO";


export class GetProjectUseCase {
    constructor(
        private projectRepository: IProjectRepository
    ) { }

    async excute(dataPayload: GetProjectRequestData) {
        const projectsFound = await this.projectRepository.findMany(dataPayload)

        return projectsFound
    }
}