import { User } from "../../domain/entities/User"

export type IUserFullInfo = {
    id: string,
    name: string,
    email: string,
    status: string,
    created_at?: Date,
    updated_at?: Date,
    organization_linked: organizationInfo,
    roles: roleInfo[],

}

export type roleInfo = {
    roleId: string,
    roleName: string
    dateLinkRole: Date,
    adjusterId: string
}

export type organizationInfo = {
    organizationId: string,
    organizationName: string,
    dateLinkSector: Date,
}
export interface IUserIntegrationRepository {
    saveChange(): Promise<void>,
    createUserWithRole(): Promise<string | Error>,
    getFullInfoUser(id: string): Promise<IUserFullInfo | Error>,
    getAllUserBySector(sectorId: string): Promise<User[] | Error>,
}