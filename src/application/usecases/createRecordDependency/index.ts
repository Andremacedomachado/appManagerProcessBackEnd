import { PrismaActivityRelationRepository } from "../../repositories/implemention/PrismaActivityRelationRepository";
import { CreateRecordDependencyController } from "./CreateRecordDependencyController";
import { CreateRecordDependencyUseCase } from "./CreateRecordDependencyUseCase";

const prismaActivityRelationRepository = new PrismaActivityRelationRepository();
const createRecordDependencyUseCase = new CreateRecordDependencyUseCase(prismaActivityRelationRepository);
const createRecordDependencyController = new CreateRecordDependencyController(createRecordDependencyUseCase);

export { createRecordDependencyUseCase, createRecordDependencyController }