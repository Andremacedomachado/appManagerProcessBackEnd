import { PrismaProjectRepository } from "../../repositories/implemention/PrismaProjectRepository";
import { GetProjectController } from "./GetProjectController";
import { GetProjectUseCase } from "./GetProjectUseCase";

const projectRepository = new PrismaProjectRepository();
const getProjectUseCase = new GetProjectUseCase(projectRepository);
const getProjectController = new GetProjectController(getProjectUseCase);

export { getProjectUseCase, getProjectController }
