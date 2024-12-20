import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { GetMessageActivityController } from "./GetMessageActivityController";
import { GetMessageActivityUseCase } from "./GetMessageActivityUseCase";


const prismaMessageActivityRepository = new PrismaMessageActivityRepository();
const getMessageActivityUseCase = new GetMessageActivityUseCase(prismaMessageActivityRepository);
const getMessageActivityController = new GetMessageActivityController(getMessageActivityUseCase);

export {getMessageActivityUseCase, getMessageActivityController}