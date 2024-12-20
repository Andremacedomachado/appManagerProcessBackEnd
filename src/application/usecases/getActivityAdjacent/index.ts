import { PrismaActivityRelationRepository } from "../../repositories/implemention/PrismaActivityRelationRepository";
import { GetActivityAdjacentController } from "./GetActivityAdjacentController";
import { GetActivityAdjacentUseCase } from "./GetActvivityAdjacentUseCase";

const prismaActivityRelationRepository = new PrismaActivityRelationRepository();
const getActivityAdjacentUseCase = new GetActivityAdjacentUseCase(prismaActivityRelationRepository);
const getActivityAdjacentController = new GetActivityAdjacentController(getActivityAdjacentUseCase);

export { getActivityAdjacentUseCase, getActivityAdjacentController };