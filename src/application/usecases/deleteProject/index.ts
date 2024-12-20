import { PrismaProjectRepository } from "../../repositories/implemention/PrismaProjectRepository";
import { DeleteProjectContoler } from "./DeleteProjectController";
import { DeleteProjectUseCase } from "./DeleteProjectUseCase";

const prismaProjectRepository = new PrismaProjectRepository()
const deleteProjectUseCase = new DeleteProjectUseCase(prismaProjectRepository)
const deleteProjectController = new DeleteProjectContoler(deleteProjectUseCase)

export { deleteProjectController, deleteProjectUseCase }