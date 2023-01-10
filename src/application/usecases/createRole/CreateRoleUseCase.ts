import { Role } from "../../../domain/entities/Role";
import { IRoleRepository, RoleId } from "../../repositories/IRoleRepository";
import { IRoleRequestDTO } from "./CreateRoleDTO";


export class CreateRoleUseCase {
    constructor(private roleRepository: IRoleRepository) {
    }

    async excute(data: IRoleRequestDTO): Promise<RoleId | Error> {
        const roleExist = await this.roleRepository.findByName(data.name);
        if (roleExist) {
            return new Error('Role alread exists!');
        }
        const { name, description, created_at, updated_at } = data;
        const role = Role.create({
            name,
            description,
            created_at,
            updated_at
        })
        const roleId = await this.roleRepository.save(role);
        if (!roleId) {
            return Error('Error save role in database');
        }
        return roleId
    }
}