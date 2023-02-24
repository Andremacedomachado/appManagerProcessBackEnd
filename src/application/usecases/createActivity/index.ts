import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { CreateActivityController } from "./CreateActivityController";
import { CreateActivityUseCase } from "./CreateActivityUseCase";

const prismaActivityRepository = new PrismaActivityRepository();
const createActivityUseCase = new CreateActivityUseCase(prismaActivityRepository);
const createActivityController = new CreateActivityController(createActivityUseCase);

export { createActivityUseCase, createActivityController };