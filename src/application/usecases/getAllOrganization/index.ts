import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository";

import { GetAllOrganizationController } from "./GetAllOrganizationController";
import { GetAllOrganizationUseCase } from "./GetAllOrganizationUseCase";

const prismaOrganizationRepository = new PrismaOrganizationRepository();
const getAllOrganizationUseCase = new GetAllOrganizationUseCase(prismaOrganizationRepository);
const getAllOrganizationController = new GetAllOrganizationController(getAllOrganizationUseCase);

export { getAllOrganizationUseCase, getAllOrganizationController };