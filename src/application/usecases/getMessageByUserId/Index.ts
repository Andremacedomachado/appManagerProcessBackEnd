import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { GetMessageByUserIdController } from "./GetMessageByUserIdController";
import { GetMessageByUserIdUseCase } from "./GetMessageByUserIdUseCase";


const prismaMessageActivityRepository = new PrismaMessageActivityRepository();
const getMessageByUserIdUseCase = new GetMessageByUserIdUseCase(prismaMessageActivityRepository);
const getMessageByUserIdController = new GetMessageByUserIdController(getMessageByUserIdUseCase);

export { getMessageByUserIdUseCase, getMessageByUserIdController };