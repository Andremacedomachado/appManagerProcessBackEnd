import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository";
import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";

import { CreateOrganizationSectorController } from "./CreateOrganizationSectorController";
import { CreateOrganizationSectorUseCase } from "./CreateOrganizationSectorUseCase";

const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository();
const prismaOrganizationRepository = new PrismaOrganizationRepository()
const createOrganizationSectorUseCase = new CreateOrganizationSectorUseCase(prismaOrganizationSectorRepository, prismaOrganizationRepository);
const createOrganizationSectorController = new CreateOrganizationSectorController(createOrganizationSectorUseCase);

export { createOrganizationSectorUseCase, createOrganizationSectorController };