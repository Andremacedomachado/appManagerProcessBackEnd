import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { GetMessageByActivityIdController } from "./GetMessageByActivityIdController";
import { GetMessageByActivityIdUseCase } from "./GetMessageByActivityIdUseCase";

const prismaMessageActivityRepository = new PrismaMessageActivityRepository();
const getMessageByActivityIdUseCase = new GetMessageByActivityIdUseCase(prismaMessageActivityRepository);
const getMessageByActivityIdController = new GetMessageByActivityIdController(getMessageByActivityIdUseCase);

export { getMessageByActivityIdUseCase, getMessageByActivityIdController };