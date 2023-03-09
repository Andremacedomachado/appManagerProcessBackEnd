import { PrismaAnnexActivityRepository } from "../../repositories/implemention/PrismaAnnexActivityRepository";
import { DeleteAnnexActivityController } from "./DeleteAnnexActivityController";
import { DeleteAnnexActivtyUseCase } from "./DeleteAnnexActivityUseCase";

const prismaAnnexActivityRepository = new PrismaAnnexActivityRepository();
const deleteAnnexActivityUseCase = new DeleteAnnexActivtyUseCase(prismaAnnexActivityRepository);
const deleteAnnexActivityController = new DeleteAnnexActivityController(deleteAnnexActivityUseCase);

export { deleteAnnexActivityUseCase, deleteAnnexActivityController };