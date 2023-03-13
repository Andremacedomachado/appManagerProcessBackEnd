import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { PrismaActivityIntegrationRepository } from "../../repositories/implemention/PrismaActivityIntegrationRepository";
import { GetRootNodeActivityTreeUseCase } from "./GetRootNodeActivityTreeUseCase";
import { GetRootNodeActivityTreeController } from "./GetRootNodeActivityTreeController";

const prismaUserRepository = new PrismaUserRepository();
const prismaCollaboratorRepository = new PrismaCollaboratorRepository()
const prismaActivityRepository = new PrismaActivityRepository();
const prismaActivityIntegrationRepository = new PrismaActivityIntegrationRepository(prismaUserRepository, prismaCollaboratorRepository, prismaActivityRepository)
const getRootNodeActivityTreeUseCase = new GetRootNodeActivityTreeUseCase(prismaActivityIntegrationRepository);
const getRootNodeActivityTreeController = new GetRootNodeActivityTreeController(getRootNodeActivityTreeUseCase);

export { getRootNodeActivityTreeUseCase, getRootNodeActivityTreeController };