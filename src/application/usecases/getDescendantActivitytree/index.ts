import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { PrismaActivityIntegrationRepository } from "../../repositories/implemention/PrismaActivityIntegrationRepository";
import { GetDescendatActivityTreeController } from "./GetDescendantActivityTreeController";
import { GetDescendantActivityTreeUsecase } from "./GetDescendantActivityTreeUseCase";

const prismaUserRepository = new PrismaUserRepository();
const prismaCollaboratorRepository = new PrismaCollaboratorRepository();
const prismaActivityRepository = new PrismaActivityRepository();
const prismaActivityIntegrationRepository = new PrismaActivityIntegrationRepository(prismaUserRepository, prismaCollaboratorRepository, prismaActivityRepository);

const getDescendantActivityTreeUseCase = new GetDescendantActivityTreeUsecase(prismaActivityIntegrationRepository);
const getDescendantActivityTreeController = new GetDescendatActivityTreeController(getDescendantActivityTreeUseCase);

export { getDescendantActivityTreeUseCase, getDescendantActivityTreeController };