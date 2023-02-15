import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository";

import { GetOrganizationByIdController } from "./GetOrganizationByIdController";
import { GetOrganizationByIdUseCase } from "./GetOrganizationByIdUseCase";

const prismaOrganizationRepository = new PrismaOrganizationRepository();
const getOrganizationByIdUseCase = new GetOrganizationByIdUseCase(prismaOrganizationRepository);
const getOrganizationByIdController = new GetOrganizationByIdController(getOrganizationByIdUseCase);

export { getOrganizationByIdUseCase, getOrganizationByIdController };