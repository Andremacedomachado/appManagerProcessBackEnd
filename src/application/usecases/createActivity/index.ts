import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository";
import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { PrismaProjectRepository } from "../../repositories/implemention/PrismaProjectRepository";
import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { CreateActivityController } from "./CreateActivityController";
import { CreateActivityUseCase } from "./CreateActivityUseCase";

const prismaActivityRepository = new PrismaActivityRepository();
const prismaUserRepository = new PrismaUserRepository();
const prismaCollaboratorRepository = new PrismaCollaboratorRepository();
const prismaProjectRepository = new PrismaProjectRepository()
const prismaMessageActivityRepository = new PrismaMessageActivityRepository()
const createActivityUseCase = new CreateActivityUseCase(prismaActivityRepository, prismaUserRepository, prismaProjectRepository, prismaMessageActivityRepository, prismaCollaboratorRepository);
const createActivityController = new CreateActivityController(createActivityUseCase);

export { createActivityUseCase, createActivityController };