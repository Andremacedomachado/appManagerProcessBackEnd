import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { GetAllMessageActivityController } from "./GetAllMessageActivityController";
import { GetAllMessageActivityUseCase } from "./GetAllMessageActivityUseCase";

const prismaMessageActivityRepository = new PrismaMessageActivityRepository();
const getAllMessageActivityUseCase = new GetAllMessageActivityUseCase(prismaMessageActivityRepository);
const getAllMessageActivityController = new GetAllMessageActivityController(getAllMessageActivityUseCase);

export { getAllMessageActivityUseCase, getAllMessageActivityController };