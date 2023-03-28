import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { GetUserByCollectionIdsController } from "./GetUserByCollectionIdsController";
import { GetUserByCollectionIdsUseCase } from "./GetUserByCollectionIdsUseCase";

const prismaUserRepository = new PrismaUserRepository();
const getUserByCollectionIdsUseCase = new GetUserByCollectionIdsUseCase(prismaUserRepository);
const getUserByCollectionIdsController = new GetUserByCollectionIdsController(getUserByCollectionIdsUseCase);

export { getUserByCollectionIdsUseCase, getUserByCollectionIdsController }