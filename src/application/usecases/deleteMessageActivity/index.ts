import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { DeleteMessageActivityController } from "./DeleteMessageActivityController";
import { DeleteMessageActivityUseCase } from "./DeleteMessageActivityUseCase";

const prismaMessageActivityRepository = new PrismaMessageActivityRepository();
const deleteMessageActivityUseCase = new DeleteMessageActivityUseCase(prismaMessageActivityRepository);
const deleteMessageActivityController = new DeleteMessageActivityController(deleteMessageActivityUseCase);

export { deleteMessageActivityUseCase, deleteMessageActivityController };