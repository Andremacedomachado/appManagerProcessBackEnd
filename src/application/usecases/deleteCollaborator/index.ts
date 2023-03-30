import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { DeleteCollaboratorController } from "./DeleteCollaboratorController";
import { DeleteCollaboratorUseCase } from "./DeleteCollaboratorUseCase";

const prismaCollaboratorRepository = new PrismaCollaboratorRepository();
const deleteCollaboratorUseCase = new DeleteCollaboratorUseCase(prismaCollaboratorRepository);
const deleteCollaboratorController = new DeleteCollaboratorController(deleteCollaboratorUseCase);

export { deleteCollaboratorUseCase, deleteCollaboratorController }