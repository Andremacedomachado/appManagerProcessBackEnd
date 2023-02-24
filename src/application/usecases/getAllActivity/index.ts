import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { GetAllActivityController } from "./GetAllActivityController";
import { GetAllActivityUseCase } from "./GetAllActivityUseCase";

const prismaActivityRepository = new PrismaActivityRepository();
const getAllActivityUseCase = new GetAllActivityUseCase(prismaActivityRepository);
const getAllActivityController = new GetAllActivityController(getAllActivityUseCase);

export { getAllActivityUseCase, getAllActivityController }