import { PrismaAnnexActivityRepository } from "../../repositories/implemention/PrismaAnnexActivityRepository";
import { DeleteAllAnnexActivityByUserController } from "./DeleteAllAnnexByUserController";
import { DeleteAllAnnexActivtyByUserUseCase } from "./DeleteAllAnnexByUserUseCase";

const prismaAnnexActivityRepository = new PrismaAnnexActivityRepository();
const deleteAllAnnexActivityByUserUseCase = new DeleteAllAnnexActivtyByUserUseCase(prismaAnnexActivityRepository);
const deleteAllAnnexActivityByUserController = new DeleteAllAnnexActivityByUserController(deleteAllAnnexActivityByUserUseCase);

export { deleteAllAnnexActivityByUserUseCase, deleteAllAnnexActivityByUserController };