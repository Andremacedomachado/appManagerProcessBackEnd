import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { CreateCollaboratorController } from "./CreateCollaboratorController";
import { CreateCollaboratorUseCase } from "./CreateCollaboratorUseCase";

const prismaCollaboratorRepository = new PrismaCollaboratorRepository();
const createCollaboratorUseCase = new CreateCollaboratorUseCase(prismaCollaboratorRepository);
const createCollaboratorController = new CreateCollaboratorController(createCollaboratorUseCase);

export { createCollaboratorUseCase, createCollaboratorController };