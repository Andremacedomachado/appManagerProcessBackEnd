import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository";
import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";
import { DeleteOrganizationController } from "./DeleteOrganizationController";
import { DeleteOrganizationUseCase } from "./DeleteOrganizationUseCase";

const prismaOrganizationRepository = new PrismaOrganizationRepository();
const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository();
const deleteOrganizationUseCase = new DeleteOrganizationUseCase(prismaOrganizationRepository, prismaOrganizationSectorRepository);
const deleteOrganizationController = new DeleteOrganizationController(deleteOrganizationUseCase);

export { deleteOrganizationUseCase, deleteOrganizationController };