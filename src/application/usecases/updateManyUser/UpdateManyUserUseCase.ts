import { IUserRepository, IUserUpdateManyProps } from "../../repositories/IUserRepository";

export class UpdateManyUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(datachange: IUserUpdateManyProps) {
        const usersUpdated = await this.userRepository.updatedMany(datachange)
        return usersUpdated
    }
}