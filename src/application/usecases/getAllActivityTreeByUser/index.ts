import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { PrismaActivityIntegrationRepository } from "../../repositories/implemention/PrismaActivityIntegrationRepository";
import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { GetALLActivityTreeByUserUseCase } from "./GetAllActivityTreeByUserUseCase";
import { GetALLActivityTreeByUserController } from "./GetAllActivityTreeByUserController";

const prismaUserRepository = new PrismaUserRepository();
const prismaCollaboratorRepository = new PrismaCollaboratorRepository();
const prismaActivityRepository = new PrismaActivityRepository();

const prismaActivityIntegrationRepository = new PrismaActivityIntegrationRepository(
    prismaUserRepository,
    prismaCollaboratorRepository,
    prismaActivityRepository
);

const getALLActivityTreeByUserUseCase = new GetALLActivityTreeByUserUseCase(prismaActivityIntegrationRepository);
const getALLActivityTreeByUserController = new GetALLActivityTreeByUserController(getALLActivityTreeByUserUseCase);

export { getALLActivityTreeByUserUseCase, getALLActivityTreeByUserController }