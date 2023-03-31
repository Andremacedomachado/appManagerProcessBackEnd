import { PrismaActivityRelationRepository } from "../../repositories/implemention/PrismaActivityRelationRepository";
import { DeleteRecordDependencyByCorrelationController } from "./DeleteRecordDependencyByCorrelationController";
import { DeleteRecordDependencyByCorrelationUseCase } from "./DeleteRecordDependencyByCorrelationUseCase";

const prismaActivityRelationRepository = new PrismaActivityRelationRepository();
const deleteRecordDependencyByCorrelationUseCase = new DeleteRecordDependencyByCorrelationUseCase(prismaActivityRelationRepository);
const deleteRecordDependencyByCorrelationController = new DeleteRecordDependencyByCorrelationController(deleteRecordDependencyByCorrelationUseCase);

export { deleteRecordDependencyByCorrelationUseCase, deleteRecordDependencyByCorrelationController }