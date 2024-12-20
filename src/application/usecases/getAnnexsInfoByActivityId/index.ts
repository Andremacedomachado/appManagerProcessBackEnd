import { PrismaAnnexActivityRepository } from "../../repositories/implemention/PrismaAnnexActivityRepository";
import { GetAnnexsInfoByActivityIdController } from "./GetAnnexsInfoByActivityIdController";
import { GetAnnexsInfoByActivityIdUsecase } from "./GetAnnexsInfoByActivityIdUseCase";


const annexActivityRepository = new PrismaAnnexActivityRepository();
const getAnnexsInfoByActivityUseCase = new GetAnnexsInfoByActivityIdUsecase(annexActivityRepository);
const getAnnexsInfoByActivityController = new GetAnnexsInfoByActivityIdController(getAnnexsInfoByActivityUseCase);

export { getAnnexsInfoByActivityUseCase, getAnnexsInfoByActivityController }