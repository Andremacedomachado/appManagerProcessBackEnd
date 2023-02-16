import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";

import { GetOrganizationSectorByIdController } from "./GetOrganizationSectorByIdController";
import { GetOrganizationSectorByIdUseCase } from "./GetOrganizationSectorByIdUseCase";

const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository();
const getOrganizationSectorByIdUseCase = new GetOrganizationSectorByIdUseCase(prismaOrganizationSectorRepository);
const getOrganizationSectorByIdController = new GetOrganizationSectorByIdController(getOrganizationSectorByIdUseCase);

export { getOrganizationSectorByIdUseCase, getOrganizationSectorByIdController };
