import { Activity } from "../../domain/entities/Activity"
import { AnnexActivity } from "../../domain/entities/AnnexActivity"
import { MessageActivity } from "../../domain/entities/MessageActivity"
import { Organization } from "../../domain/entities/Organization"
import { OrganizationSector } from "../../domain/entities/OrganizationSector"
import { RecordCollaborator } from "../../domain/entities/RecordCollaborator"
import { RecordDependency } from "../../domain/entities/RecordDependency"
import { RecordRole } from "../../domain/entities/RecordRole"
import { Role } from "../../domain/entities/Role"
import { User } from "../../domain/entities/User"


export type SectorDeletedDataReponseType = {
    collectionOfAffectedUsers: User[],
    infoSectorDeleted: OrganizationSector
}

export type OrganizationDeletedDataReponseType = {
    collectionOfAffectedSectors: SectorDeletedDataReponseType[],
    infoOrganizationDeleted: Organization
}

export type UserDeletedDataResponseType = {
    infoUser: User,
    roles: RecordRole[],
    collaborators: RecordCollaborator[],
    messagesInActivity: MessageActivity[],
    annexsInActivity: AnnexActivity[],
    activitiesResponsible: Activity[],
}

export type ActivityDeletedDataResponseType = {
    infoActivity: Activity,
    collaborators: RecordCollaborator[],
    dependencies: RecordDependency[],
    messagesInActivity: MessageActivity[],
    annexsInActivity: AnnexActivity[],
}

export interface IDeleteRecordIntegrationRepository {
    deleteUserOnCascade(userid: string): Promise<UserDeletedDataResponseType | Error>,
    deleteSectorOnCascade(sectorId: string): Promise<SectorDeletedDataReponseType | Error>,
    deleteOrganizationOnCascade(organizationId: string): Promise<OrganizationDeletedDataReponseType | Error>,
    deleteActivityOnCascade(activityId: string): Promise<ActivityDeletedDataResponseType | Error>,
}