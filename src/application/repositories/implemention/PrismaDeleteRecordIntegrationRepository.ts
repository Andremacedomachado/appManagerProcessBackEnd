import { prisma } from "../../../database";
import { Activity, STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity";
import { AnnexActivity } from "../../../domain/entities/AnnexActivity";
import { MessageActivity, TYPEMESSAGE } from "../../../domain/entities/MessageActivity";
import { Organization } from "../../../domain/entities/Organization";
import { RecordCollaborator } from "../../../domain/entities/RecordCollaborator";
import { RecordDependency } from "../../../domain/entities/RecordDependency";
import { User } from "../../../domain/entities/User";
import { IActivityRelationRepository } from "../IActivityRelationRepository";
import { IActivityRepository } from "../IActivityRepository";
import { IAnnexActivityRepository } from "../IAnnexActivityRepository";
import { ICollaboratorRepository } from "../ICollaboratorReposytory";
import { ActivityDeletedDataResponseType, IDeleteRecordIntegrationRepository, OrganizationDeletedDataReponseType, SectorDeletedDataReponseType, UserDeletedDataresponseType } from "../IDeleteRecordIntegrationRepository";
import { IMessageActivityRepository } from "../IMessageActivityRepository";
import { IOrganizationRepository } from "../IOrganizationRepository";
import { IOrganizationSectorRepository } from "../IOrganizationSectorRepository";
import { IRoleRepository } from "../IRoleRepository";
import { IUserIntegrationRepository } from "../IUserIntegrationRepository";
import { IUserOnRolesRepository } from "../IUserOnRolesRepository";
import { IUserRepository } from "../IUserRepository";

export class PrismaDeleteRecordInterationRepository implements IDeleteRecordIntegrationRepository {

    constructor(
        private organizationSectorRepository: IOrganizationSectorRepository,
        private organizationRepository: IOrganizationRepository,
        private userRepository: IUserRepository,
        private userIntegrationRepository: IUserIntegrationRepository,
        private userOnRoleRepository: IUserOnRolesRepository,
        private roleRepository: IRoleRepository,
        private collaboratorRepository: ICollaboratorRepository,
        private activityRepository: IActivityRepository,
        private activityRelationRepository: IActivityRelationRepository,
        private messageActivityRepository: IMessageActivityRepository,
        private annexActivityRepository: IAnnexActivityRepository,
    ) { }
    async deleteUserOnCascade(userid: string): Promise<UserDeletedDataresponseType | Error> {

        const userExists = await prisma.user.findUnique({
            where: {
                id: userid
            }
        })

        if (!userExists) return new Error('User not exists');


        throw new Error("Method not implemented.");
    }

    async unlinkAllSectorUsers(sectorId: string): Promise<User[] | Error> {
        const sectorExists = await this.organizationSectorRepository.findById(sectorId);
        if (!sectorExists) {
            return new Error('Sector not exist')
        }
        const usersInSector = await this.userIntegrationRepository.getAllUserBySector(sectorId);

        if (usersInSector instanceof Error) {
            return usersInSector
        }
        const userIdsForUnlink = usersInSector.map(user => user.id);
        const usersUpdated = await this.userRepository.updatedMany({ ids: userIdsForUnlink, organization_sector_id: null })
        return usersInSector
    }

    async deleteSectorOnCascade(sectorId: string): Promise<SectorDeletedDataReponseType | Error> {
        const sectorExists = await this.organizationSectorRepository.findById(sectorId);
        if (!sectorExists) {
            return new Error('Sector not exists');
        }
        const usersUnlink = await this.unlinkAllSectorUsers(sectorId);
        if (usersUnlink instanceof Error) {
            return usersUnlink;
        }
        const sectorDeleted = await this.organizationSectorRepository.delete(sectorId);
        if (sectorDeleted instanceof Error) {
            return sectorDeleted;
        }

        return {
            collectionOfAffectedUsers: usersUnlink,
            infoSectorDeleted: sectorDeleted
        } as SectorDeletedDataReponseType
    }

    async deleteOrganizationOnCascade(organizationId: string): Promise<OrganizationDeletedDataReponseType | Error> {

        const promiseAllExcute = await prisma.$transaction(async tx => {
            const organizationExists = await this.organizationRepository.findById(organizationId);
            if (!organizationExists) {
                throw new Error('Organization not Exists');
            }
            const allSectorInOrganization = await this.organizationSectorRepository.findSectorsByOrganizationId(organizationId);
            const collectionSectorsDeleted: SectorDeletedDataReponseType[] = [];
            for (const sector of allSectorInOrganization) {
                const usersUnlink = await this.unlinkAllSectorUsers(sector.id);
                if (usersUnlink instanceof Error) {
                    throw usersUnlink;
                }
                const sectorDeleted = await this.organizationSectorRepository.delete(sector.id);
                if (sectorDeleted instanceof Error) {
                    throw sectorDeleted;
                }

                collectionSectorsDeleted.push({
                    collectionOfAffectedUsers: usersUnlink,
                    infoSectorDeleted: sectorDeleted
                });
            }

            const organizationDeletedInfo = await this.organizationRepository.delete(organizationId)

            if (organizationDeletedInfo instanceof Error) {
                throw organizationDeletedInfo
            }

            return { collectionOfAffectedSectors: collectionSectorsDeleted, infoOrganizationDeleted: organizationDeletedInfo } as OrganizationDeletedDataReponseType
        })

        return promiseAllExcute
    }

    async deleteActivityOnCascade(activityId: string): Promise<ActivityDeletedDataResponseType | Error> {
        try {
            const activityDeletedRecords = await prisma.$transaction(async (tx) => {

                const activityData = await tx.activity.delete({
                    where: {
                        id: activityId
                    },
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        due_date: true,
                        start_date: true,
                        created_at: true,
                        progress_status: true,
                        responsible_id: true,
                        type_node: true,
                        updated_at: true,
                        Annex: true,
                        Collaborators: true,
                        ChildrenRelationship: true,
                        ParentRelationship: true,
                        MessageAtivity: true,
                    }
                });
                const { id, ChildrenRelationship, ParentRelationship, Annex, Collaborators, MessageAtivity, due_date, description, start_date, ...props } = activityData
                const registerDeleted = {
                    infoActivity: Activity.create({
                        ...props,
                        description: description ?? undefined,
                        due_date: due_date ?? undefined,
                        start_date: start_date ?? undefined,
                        type_node: props.type_node as TYPENODE,
                        progress_status: props.progress_status as STATUSACTIVITY
                    }, id),
                    collaborators: Collaborators.map(record => RecordCollaborator.create(record)),
                    dependencies: [
                        ...ChildrenRelationship.map(record => RecordDependency.create(record)),
                        ...ParentRelationship.map(record => RecordDependency.create(record))
                    ],
                    annexsInActivity: Annex.map(record => AnnexActivity.create(record)),
                    messagesInActivity: MessageAtivity.map(record => MessageActivity.create({
                        ...record,
                        type_message: record.type_message as TYPEMESSAGE
                    }))
                } as ActivityDeletedDataResponseType;

                return registerDeleted;
            })

            return activityDeletedRecords
        } catch (error) {
            return error as Error
        }
    }

    /* async deleteActivityOnCascadeWithRepositories(activityId: string): Promise<ActivityDeletedDataResponseType | Error> {
    // Not work... because prisma not support nested trasactions
    // possible resolve, implements Proxy for pass reference of the transaction (tx) 
        try {
            const activityDeletedRecords = await prisma.$transaction(async (tx) => {
                const collaborators = await this.collaboratorRepository.deleteMany({ activity_id: activityId });
                const dependencies = await this.activityRelationRepository.deleteByCorrelationId(activityId);
                const messagesInActivity = await this.messageActivityRepository.deleteCollectionRecordsByActivityId(activityId);
                const annexsInActivity = await this.annexActivityRepository.deleteRecordsByfilter({ activity_id: activityId });
                if (annexsInActivity instanceof Error) {
                    throw annexsInActivity
                }

                const infoActivity = await this.activityRepository.delete(activityId);
                const registerDeleted = {
                    infoActivity,
                    collaborators,
                    dependencies,
                    annexsInActivity,
                    messagesInActivity
                } as ActivityDeletedDataResponseType;

                return registerDeleted;
            })

            return activityDeletedRecords
        } catch (error) {
            return error as Error
        }
    } */
}