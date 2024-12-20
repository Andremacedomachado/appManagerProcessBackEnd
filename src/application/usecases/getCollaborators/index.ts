import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { GetCollaboratorsController } from "./GetCollaboratorsController";
import { GetCollaboratorsUseCase } from "./GetCollaboratorsUseCase";

const prismaCollaboratorRepository = new PrismaCollaboratorRepository()
const getCollaboratorsUseCase = new GetCollaboratorsUseCase(prismaCollaboratorRepository)
const getCollaboratorsController = new GetCollaboratorsController(getCollaboratorsUseCase)

export { getCollaboratorsUseCase, getCollaboratorsController }