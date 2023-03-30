import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { DeleteAllCollboratorByActivityUseCase } from "./DeleteAllCollaboratorByActivityUseCase";
import { DeleteAllCollabotatorByActivityController } from "./DeleteAllCollabotatorByActivityController";

const prismaCollaboratorRepository = new PrismaCollaboratorRepository();
const deleteAllCollboratorByActivityUseCase = new DeleteAllCollboratorByActivityUseCase(prismaCollaboratorRepository);
const deleteAllCollboratorByActivityController = new DeleteAllCollabotatorByActivityController(deleteAllCollboratorByActivityUseCase);

export { deleteAllCollboratorByActivityUseCase, deleteAllCollboratorByActivityController }