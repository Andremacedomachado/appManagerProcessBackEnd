import { Organization } from "../../domain/entities/Organization"
import { OrganizationSector } from "../../domain/entities/OrganizationSector"
import { User } from "../../domain/entities/User"


export type SectorDeletedDataReponseType = {
    collectionOfAffectedUsers: User[],
    infoSectorDeleted: OrganizationSector
}

export type OrganizationDeletedDataReponseType = {
    collectionOfAffectedSectors: SectorDeletedDataReponseType[],
    infoOrganizationDeleted: Organization
}

export type UserDeletedDataresponseType = {
}

export interface IDeleteRecordIntegrationRepository {
    deleteUserOnCascade(userid: string): Promise<UserDeletedDataresponseType | Error>,
    deleteSectorOnCascade(sectorId: string): Promise<SectorDeletedDataReponseType | Error>,
    deleteOrganizationOnCascade(organizationId: string): Promise<OrganizationDeletedDataReponseType | Error>
}