import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { DeleteAllCollboratorByUserUseCase } from "./DeleteAllCollaboratorByUserUseCase";
import { DeleteAllCollabotatorByUserController } from "./DeleteAllCollabotatorByUserController";

const prismaCollaboratorRepository = new PrismaCollaboratorRepository();
const deleteAllCollboratorByUserUseCase = new DeleteAllCollboratorByUserUseCase(prismaCollaboratorRepository);
const deleteAllCollboratorByUserController = new DeleteAllCollabotatorByUserController(deleteAllCollboratorByUserUseCase);

export { deleteAllCollboratorByUserUseCase, deleteAllCollboratorByUserController }