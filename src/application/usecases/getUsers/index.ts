import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { GetUsersController } from "./GetUsersController";
import { GetUsersUsecase } from "./GetUsersUseCase";


const prismaUserRepository = new PrismaUserRepository()
const getUsersUseCase = new GetUsersUsecase(prismaUserRepository)
const getUsersController = new GetUsersController(getUsersUseCase)

export { getUsersUseCase, getUsersController }