import { IUserRepository } from "../../repositories/IUserRepository";
import { UpdateUserRequestDTO } from "./UpdateUserDTO";

export class UpdateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(dataUpdate: UpdateUserRequestDTO) {
        const userUpdated = await this.userRepository.update(dataUpdate)
        if (!userUpdated) {
            return new Error("User not exist Or email being used by another user")
        }
        return userUpdated
    }
}