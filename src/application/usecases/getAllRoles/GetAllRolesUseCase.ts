import { IRoleRepository } from "../../repositories/IRoleRepository";


export class GetAllRolesUsecase {
    constructor(private repository: IRoleRepository) { }

    async execute() {
        const roles = await this.repository.findAll()
        return roles
    }
}