import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { GetCollaboratorByActivityController } from "./GetCollaboratorByActivityController";
import { GetCollaboratorByActivityUseCase } from "./GetCollaboratorByActivityUseCase";

const prismaCollaboratorRepository = new PrismaCollaboratorRepository();
const getCollaboratorByActivityIdUseCase = new GetCollaboratorByActivityUseCase(prismaCollaboratorRepository);
const getCollaboratorByActivityIdController = new GetCollaboratorByActivityController(getCollaboratorByActivityIdUseCase);

export { getCollaboratorByActivityIdUseCase, getCollaboratorByActivityIdController }
