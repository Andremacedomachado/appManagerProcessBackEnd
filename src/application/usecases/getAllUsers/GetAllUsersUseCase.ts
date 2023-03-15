import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

export class GetAllUsersUseCase {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(): Promise<User[] | Error> {
        const users = await this.userRepository.findAll()

        if (!users) {
            return new Error('database is empty in users table')
        }

        return users;
    }
}