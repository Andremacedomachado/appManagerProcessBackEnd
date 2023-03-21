import { IUserIntegrationRepository } from "../../repositories/IUserIntegrationRepository";
import { ChangeSectorUserRequestDTO } from "./ChangeSectorUserDTO";

export class ChangeSectorUserUseCase {
    constructor(private userIntegrationRepository: IUserIntegrationRepository) { }

    async execute(dataChange: ChangeSectorUserRequestDTO) {
        const userUpdatedOrError = await this.userIntegrationRepository.changeUserSector(dataChange);
        return userUpdatedOrError;
    }
}