import { PrismaRoleRepository } from "../../repositories/implemention/PrismaRoleRepository";
import { GetAllRolesController } from "./GetAllRolesController";
import { GetAllRolesUsecase } from "./GetAllRolesUseCase";

const prismaRoleRepository = new PrismaRoleRepository()
const getAllRolesUseCase = new GetAllRolesUsecase(prismaRoleRepository);
const getAllRolesController = new GetAllRolesController(getAllRolesUseCase)

export {
    getAllRolesController,
    getAllRolesUseCase
}