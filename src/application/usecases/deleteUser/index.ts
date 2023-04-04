import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

const prismaUserRepository = new PrismaUserRepository();
const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
