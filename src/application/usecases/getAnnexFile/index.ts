import { GetAnnexFileController } from "./GetAnnexFileController";
import { GetAnnexFileUseCase } from "./GetAnnexFileUseCase";

const getAnnexFileUseCase = new GetAnnexFileUseCase();
const getAnnexFilecontroller = new GetAnnexFileController(getAnnexFileUseCase);

export { getAnnexFileUseCase, getAnnexFilecontroller };