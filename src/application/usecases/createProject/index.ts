import { PrismaProjectRepository } from "../../repositories/implemention/PrismaProjectRepository";
import { CreateProjectController } from "./CreateProjectController";
import { CreateProjectUseCase } from "./CreateProjectUsecase";

const prismaProjectRepository = new PrismaProjectRepository();
const createProjectUseCase = new CreateProjectUseCase(prismaProjectRepository);
const createProjectController = new CreateProjectController(createProjectUseCase);

export { createProjectUseCase, createProjectController }