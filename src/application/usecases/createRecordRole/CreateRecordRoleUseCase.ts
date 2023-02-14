import { IUserOnRolesRepository } from "../../repositories/IUserOnRolesRepository";
import { IRecordRolesRequestDTO } from "./CreateRecordRoleDTO";



export class CreateRecordRoleUseCase {
    constructor(private userOnRolesRepository: IUserOnRolesRepository) {
    }

    async execute({ userId, rolesIds, adjusterId }: IRecordRolesRequestDTO) {
        const errorOrVoid = await this.userOnRolesRepository.save(rolesIds, userId, adjusterId)

        if (errorOrVoid instanceof Error) {
            return errorOrVoid
        }
        return null
    }
}