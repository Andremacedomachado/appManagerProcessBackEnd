import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { UpdateMessageActivityController } from "./UpdateMessageActivityController";
import { UpdateMessageActivityUseCase } from "./UpdateMessageActivityUseCase";

const prismaMessageActivityRepository = new PrismaMessageActivityRepository();
const updateMessageActivityUseCase = new UpdateMessageActivityUseCase(prismaMessageActivityRepository);
const updateMessageActivityController = new UpdateMessageActivityController(updateMessageActivityUseCase);

export { updateMessageActivityUseCase, updateMessageActivityController }