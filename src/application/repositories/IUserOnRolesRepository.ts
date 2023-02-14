import { RecordRole } from "../../domain/entities/RecordRole"


export interface IUserOnRolesRepository {

    save(rolesId: string[], userId: string, adjusterId: string): Promise<null | Error>
    replaceAll(rolesId: string[], userId: string, adjusterId: string): Promise<null | Error>
    findByUserId(userId: string): Promise<RecordRole[] | null>
    findByRoleId(roleId: string): Promise<RecordRole[] | null>
    findAll(): Promise<RecordRole[] | null>
}