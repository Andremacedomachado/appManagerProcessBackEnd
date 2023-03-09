import { PrismaAnnexActivityRepository } from "../../repositories/implemention/PrismaAnnexActivityRepository";
import { CreateAnnexActivityController } from "./CreateAnnexActivityController";
import { CreateAnnexActivityUseCase } from "./CreateAnnexActivityUseCase";

const prismaAnnexActivityRepository = new PrismaAnnexActivityRepository();
const createAnnexActivityUseCase = new CreateAnnexActivityUseCase(prismaAnnexActivityRepository);
const createAnnexActivityController = new CreateAnnexActivityController(createAnnexActivityUseCase);

export { createAnnexActivityUseCase, createAnnexActivityController };