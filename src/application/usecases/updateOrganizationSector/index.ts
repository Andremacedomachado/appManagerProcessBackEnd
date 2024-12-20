import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";
import { UpdateOrganizationSectorController } from "./UpdateOrganizationSectorController";
import { UpdateOrganizationSectorUseCase } from "./UpdateOrganizationSectorUseCase";

const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository()
const updateOrganizationSectorUsecase = new UpdateOrganizationSectorUseCase(prismaOrganizationSectorRepository)
const updateOrganizationSectorController = new UpdateOrganizationSectorController(updateOrganizationSectorUsecase);

export { updateOrganizationSectorController, updateOrganizationSectorUsecase }