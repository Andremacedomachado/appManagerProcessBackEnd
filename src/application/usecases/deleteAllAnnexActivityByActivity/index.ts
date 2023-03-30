import { PrismaAnnexActivityRepository } from "../../repositories/implemention/PrismaAnnexActivityRepository";
import { DeleteAllAnnexActivityByActivityController } from "./DeleteAllAnnexActivityByActivityController";
import { DeleteAllAnnexActivityByActivityUseCase } from "./DeleteAllAnnexActivityByActivityUseCase";

const prismaAnnexActivityRepository = new PrismaAnnexActivityRepository();
const deleteAllAnnexActivtyByActivityUseCase = new DeleteAllAnnexActivityByActivityUseCase(prismaAnnexActivityRepository)
const deleteAllAnnexActivityByActivityController = new DeleteAllAnnexActivityByActivityController(deleteAllAnnexActivtyByActivityUseCase);

export { deleteAllAnnexActivtyByActivityUseCase, deleteAllAnnexActivityByActivityController };