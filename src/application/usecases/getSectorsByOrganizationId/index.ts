import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";
import { GetSectorsByOrganizationIdController } from "./GetSectorsByOrganizationIdController";
import { GetSectorsByOrganizationIdUseCase } from "./GetSectorsByOrganizationIdUseCase";

const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository()
const getSectorsByOrganizationIdUseCase = new GetSectorsByOrganizationIdUseCase(prismaOrganizationSectorRepository);
const getSectorsByOrganizationIdController = new GetSectorsByOrganizationIdController(getSectorsByOrganizationIdUseCase);

export { getSectorsByOrganizationIdUseCase, getSectorsByOrganizationIdController }