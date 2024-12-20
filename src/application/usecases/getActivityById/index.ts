import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { GetActivityByIdController } from "./GetActivityByIdController";
import { GetActivityByIdUseCase } from "./GetActivityByIdUseCase";

const prismaActivityRepository = new PrismaActivityRepository();
const getActivityByIdUseCase = new GetActivityByIdUseCase(prismaActivityRepository);
const getActivityByIdController = new GetActivityByIdController(getActivityByIdUseCase);

export { getActivityByIdUseCase, getActivityByIdController };