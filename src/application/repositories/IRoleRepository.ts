import { Role } from "../../domain/entities/Role";

export type RoleId = {
    id: string
}

export interface IRoleRepository {
    save(data: Role): Promise<RoleId | null>,
    findById(id: string): Promise<Role | null>
    findByName(name: string): Promise<Role | null>,
    findAll(): Promise<Role[] | null>
}