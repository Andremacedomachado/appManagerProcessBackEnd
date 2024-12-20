import { IUserRepository } from "../../repositories/IUserRepository";
import { GetUsersSchema } from "./GetUsersDTO";

export class GetUsersUsecase {
    constructor(private userRepository: IUserRepository) { }
    async execute(params?: GetUsersSchema) {
        return await this.userRepository.findMany(params)
    }
}