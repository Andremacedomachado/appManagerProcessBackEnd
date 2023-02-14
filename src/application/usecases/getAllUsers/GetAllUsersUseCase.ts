import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

export class GetAllUsersUseCase {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(): Promise<User[] | null> {
        const users = await this.userRepository.findAll()

        return users;
    }
}