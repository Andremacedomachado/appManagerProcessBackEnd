import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository";
import { UpdateOrganizationController } from "./UpdateOrganizationController";
import { UpdateOrganizationUseCase } from "./UpdateOrganzationUseCase";


const prismaOrganzationRepository = new PrismaOrganizationRepository()
const updateOrganizationUsecase = new UpdateOrganizationUseCase(prismaOrganzationRepository)
const updateOrganizationController = new UpdateOrganizationController(updateOrganizationUsecase)

export { updateOrganizationController, updateOrganizationUsecase }