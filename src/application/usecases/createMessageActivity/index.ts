import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { CreateMessageActivityController } from "./CreateMessageActivityController";
import { CreateMessageActivityUseCase } from "./CreateMessageActivityUseCase";

const prismaMessageActivityRepository = new PrismaMessageActivityRepository();
const createMessageActivityUseCase = new CreateMessageActivityUseCase(prismaMessageActivityRepository);
const createMessageActivityController = new CreateMessageActivityController(createMessageActivityUseCase);

export { createMessageActivityUseCase, createMessageActivityController };