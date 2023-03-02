import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { GetDescendatActivityTreeController } from "./GetDescendantActivityTreeController";
import { GetDescendantActivityTreeUsecase } from "./GetDescendantActivityTreeUseCase";

const prismaActivityRepository = new PrismaActivityRepository();
const getDescendantActivityTreeUseCase = new GetDescendantActivityTreeUsecase(prismaActivityRepository);
const getDescendantActivityTreeController = new GetDescendatActivityTreeController(getDescendantActivityTreeUseCase);

export { getDescendantActivityTreeUseCase, getDescendantActivityTreeController };