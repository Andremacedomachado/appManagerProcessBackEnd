import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { DeleteActivityController } from "./DeleteActivityController";
import { DeleteActivityUseCase } from "./DeleteActivityUseCase";

const prismaActivityRepository = new PrismaActivityRepository();
const deleteActivityUseCase = new DeleteActivityUseCase(prismaActivityRepository);
const deleteActivityController = new DeleteActivityController(deleteActivityUseCase);

export { deleteActivityUseCase, deleteActivityController }