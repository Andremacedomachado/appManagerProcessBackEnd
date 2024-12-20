import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository";
import { PrismaProjectRepository } from "../../repositories/implemention/PrismaProjectRepository";
import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { UpdateActivityByIdController } from "./UpdateActivityByIdController";
import { UpdateActivityByIdUseCase } from "./UpdateActivityByIdUseCase";

const activityRepository = new PrismaActivityRepository()
const userRepository = new PrismaUserRepository()
const messageActivityRepository = new PrismaMessageActivityRepository()
const projectRepository = new PrismaProjectRepository()
const updateActivityByIdUseCase = new UpdateActivityByIdUseCase(activityRepository, userRepository, projectRepository, messageActivityRepository)
const updateActivityByIdController = new UpdateActivityByIdController(updateActivityByIdUseCase)

export { updateActivityByIdUseCase, updateActivityByIdController }