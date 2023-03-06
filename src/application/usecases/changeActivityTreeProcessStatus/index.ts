import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository";
import { ChangeActivityTreeProcessStatusController } from "./ChangeActivityTreeProcessStatusController";
import { ChangeActivityTreeProcessStatusUseCase } from "./ChangeActivityTreeProcessStatusUseCase";

const prismaActivityRepository = new PrismaActivityRepository();
const changeActivityTreeProcessStatusUseCase = new ChangeActivityTreeProcessStatusUseCase(prismaActivityRepository);
const changeActivityTreeProcessStatusController = new ChangeActivityTreeProcessStatusController(changeActivityTreeProcessStatusUseCase);

export { changeActivityTreeProcessStatusUseCase, changeActivityTreeProcessStatusController };