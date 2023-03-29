import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { DeleteMessageActivityByUserInActivityControler } from "./DeleteMessageActivityByUserInActivityController";
import { DeleteMessageActivityByUserInActivityUseCase } from "./DeleteMessageActivityByUserInActivityUseCase";

const prismaMessageActivityRepository = new PrismaMessageActivityRepository();
const deleteMessageActivityByUserInActivityUseCase = new DeleteMessageActivityByUserInActivityUseCase(prismaMessageActivityRepository);
const deleteMessageActivityByUserInActivityController = new DeleteMessageActivityByUserInActivityControler(deleteMessageActivityByUserInActivityUseCase);

export { deleteMessageActivityByUserInActivityUseCase, deleteMessageActivityByUserInActivityController };