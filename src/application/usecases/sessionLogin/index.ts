import { PrismaUserRepository } from '../../repositories/implemention/PrismaUserRepository';
import { SessionLoginController } from './SessionLoginController';
import { SessionLoginUseCase } from './SessionLoginUseCase';

const prismaUserRepository = new PrismaUserRepository();

const sessionLoginUseCase = new SessionLoginUseCase(prismaUserRepository);

const sessionLoginController = new SessionLoginController(
    sessionLoginUseCase
);

export { sessionLoginUseCase, sessionLoginController };