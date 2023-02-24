import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { GetActivityController } from "./GetActivityController";
import { GetActivityUseCase } from "./GetActivityUseCase";

const prismaActivityRepository = new PrismaActivityRepository();
const getActivityUseCase = new GetActivityUseCase(prismaActivityRepository);
const getActivityController = new GetActivityController(getActivityUseCase);

export { getActivityUseCase, getActivityController };