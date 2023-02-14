import { PrismaUserOnRolesRepository } from "../../repositories/implemention/PrismaUserOnRolesRepository";

import { CreateRecordRoleController } from "./CreateRecordRoleController";
import { CreateRecordRoleUseCase } from "./CreateRecordRoleUseCase";

const prismaUserOnRolesRepository = new PrismaUserOnRolesRepository();
const createRecordRoleUseCase = new CreateRecordRoleUseCase(prismaUserOnRolesRepository);
const createRecordRoleController = new CreateRecordRoleController(createRecordRoleUseCase);

export { createRecordRoleUseCase, createRecordRoleController };