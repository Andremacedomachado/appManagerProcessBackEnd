import { IUserRepository } from "../../repositories/IUserRepository";

export class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(userId: string) {
        const userDeletedOrError = await this.userRepository.delete(userId);
        return userDeletedOrError;
    }
}