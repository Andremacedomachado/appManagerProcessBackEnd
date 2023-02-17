import { IUserRepository } from "../../repositories/IUserRepository";
import { IChangeWorkerStatusRequestDTO } from "./ChangeWorkerStatusDTO";


export class ChangeWorkerStatusUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: IChangeWorkerStatusRequestDTO) {

        const userUpdatedOrNull = await this.userRepository.update({
            id: data.id,
            status: data.status
        });
        if (!userUpdatedOrNull) {
            return new Error('User not exists');
        }
        return userUpdatedOrNull;
    }
}