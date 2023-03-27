import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { UpdateManyUserController } from "./UpdateManyUserController";
import { UpdateManyUserUseCase } from "./UpdateManyUserUseCase";

const prismaUserRepository = new PrismaUserRepository();
const updateManyUserUseCase = new UpdateManyUserUseCase(prismaUserRepository);
const updateManyUserController = new UpdateManyUserController(updateManyUserUseCase);

export { updateManyUserUseCase, updateManyUserController }