import { PrismaAnnexActivityRepository } from "../../repositories/implemention/PrismaAnnexActivityRepository";
import { GetAnnexActivityInfoController } from "./GetAnnexActivityInfoController";
import { GetAnnexActivityInfoUseCase } from "./GetAnnexActivityInfoUseCase";

const prismaAnnexActivityRepository = new PrismaAnnexActivityRepository();
const getAnnexActivityInfoUseCase = new GetAnnexActivityInfoUseCase(prismaAnnexActivityRepository);
const getAnnexActivityInfoUController = new GetAnnexActivityInfoController(getAnnexActivityInfoUseCase);

export { getAnnexActivityInfoUseCase, getAnnexActivityInfoUController };