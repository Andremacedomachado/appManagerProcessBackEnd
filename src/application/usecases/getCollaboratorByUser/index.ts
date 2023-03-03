import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { GetCollaboratorByUserController } from "./GetCollaboratorByUserController";
import { GetCollaboratorByUserUseCase } from "./GetCollaboratorByUserUseCase";

const prismaCollaboratorRepository = new PrismaCollaboratorRepository();
const getCollaboratorByUserUseCase = new GetCollaboratorByUserUseCase(prismaCollaboratorRepository);
const getCollaboratorByUserController = new GetCollaboratorByUserController(getCollaboratorByUserUseCase);

export { getCollaboratorByUserUseCase, getCollaboratorByUserController };