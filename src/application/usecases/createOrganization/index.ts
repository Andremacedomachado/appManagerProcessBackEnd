import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository";

import { CreateOrganizationController } from "./CreateOganizationController";
import { CreateOrganizationUsecase } from "./CreateOrganizationUseCase";

const prismaOrganizationRepository = new PrismaOrganizationRepository();
const createOrganizationUseCase = new CreateOrganizationUsecase(prismaOrganizationRepository);
const createOrganizationController = new CreateOrganizationController(createOrganizationUseCase);

export { createOrganizationUseCase, createOrganizationController };