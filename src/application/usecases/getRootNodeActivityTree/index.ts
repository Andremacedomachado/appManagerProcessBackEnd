import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { GetRootNodeActivityTreeUseCase } from "./GetRootNodeActivityTreeUseCase";
import { GetRootNodeActivityTreeController } from "./GetRootNodeActivityTreeController";

const prismaActivityRepository = new PrismaActivityRepository();
const getRootNodeActivityTreeUseCase = new GetRootNodeActivityTreeUseCase(prismaActivityRepository);
const getRootNodeActivityTreeController = new GetRootNodeActivityTreeController(getRootNodeActivityTreeUseCase);

export { getRootNodeActivityTreeUseCase, getRootNodeActivityTreeController };