import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { ChangeWorkerStatusController } from "./ChangeWorkerStatusController";
import { ChangeWorkerStatusUseCase } from "./ChangeWorkerStatusUseCase";

const prismaUserRepository = new PrismaUserRepository();
const changeWorkerStatusUseCase = new ChangeWorkerStatusUseCase(prismaUserRepository);
const changeWorkerStatusController = new ChangeWorkerStatusController(changeWorkerStatusUseCase);

export { changeWorkerStatusUseCase, changeWorkerStatusController };