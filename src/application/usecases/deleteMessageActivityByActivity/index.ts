import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { DeleteMessageActivityByActivityController } from "./DeleteMessageActivityByActivityController";
import { DeleteMessageActivityByActivityUseCase } from "./DeleteMessageActivityByActivityUseCase";

const prismaMessageActivityRepository = new PrismaMessageActivityRepository();
const deleteMessageActivityByActivityUseCase = new DeleteMessageActivityByActivityUseCase(prismaMessageActivityRepository);
const deleteMessageActivityByActivityController = new DeleteMessageActivityByActivityController(deleteMessageActivityByActivityUseCase);

export { deleteMessageActivityByActivityUseCase, deleteMessageActivityByActivityController };
