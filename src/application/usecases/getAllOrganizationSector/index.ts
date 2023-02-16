import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";

import { GetAllOrganizationSectorUseCase } from "./GetAllOrganizationSectorUseCase";
import { GetAllOrganizationSectorController } from "./GetAllOrganizationSectorController";

const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository();
const getAllOrganizationSectorUseCase = new GetAllOrganizationSectorUseCase(prismaOrganizationSectorRepository);
const getAllOrganizationSectorController = new GetAllOrganizationSectorController(getAllOrganizationSectorUseCase);

export { getAllOrganizationSectorUseCase, getAllOrganizationSectorController };