import { PrismaProjectRepository } from "../../repositories/implemention/PrismaProjectRepository";
import { UpdateProjecController } from "./UpdateProjectController";
import { UpdateProjectUseCase } from "./UpdateProjectUseCase";


const prismaProjectRepository = new PrismaProjectRepository()
const updateProjectUseCase = new UpdateProjectUseCase(prismaProjectRepository)
const updateProjectController = new UpdateProjecController(updateProjectUseCase)

export { updateProjectController, updateProjectUseCase }