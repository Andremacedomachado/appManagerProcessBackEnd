import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { DeleteAllMessageActivityByUserController } from "./DeleteAllMessageActivityByUserController";
import { DeleteAllMessageActivityByUserUseCase } from "./DeleteAllMessageActivityByUserUseCase";

const prismaMessageActivityRepository = new PrismaMessageActivityRepository();
const deleteAllMessageActivityByUserUseCase = new DeleteAllMessageActivityByUserUseCase(prismaMessageActivityRepository);
const deleteAllMessageActivityByUserController = new DeleteAllMessageActivityByUserController(deleteAllMessageActivityByUserUseCase);

export { deleteAllMessageActivityByUserUseCase, deleteAllMessageActivityByUserController };