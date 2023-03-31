import { PrismaActivityRelationRepository } from "../../repositories/implemention/PrismaActivityRelationRepository";
import { DeleteRecordDependencyController } from "./DeleteRecordDependencyController";
import { DeleteRecordDependencyUseCase } from "./DeleteRecordDependencyUseCase";

const prismaActivityRelationRepository = new PrismaActivityRelationRepository();
const deleteRecordDependencyUseCase = new DeleteRecordDependencyUseCase(prismaActivityRelationRepository);
const deleteRecordDependencyController = new DeleteRecordDependencyController(deleteRecordDependencyUseCase);

export { deleteRecordDependencyUseCase, deleteRecordDependencyController };