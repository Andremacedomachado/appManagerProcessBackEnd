import { prisma } from "../../../database";
import { Organization } from "../../../domain/entities/Organization";
import { User } from "../../../domain/entities/User";
import { IActivityRelationRepository } from "../IActivityRelationRepository";
import { IActivityRepository } from "../IActivityRepository";
import { IAnnexActivityRepository } from "../IAnnexActivityRepository";
import { ICollaboratorRepository } from "../ICollaboratorReposytory";
import { IDeleteRecordIntegrationRepository, OrganizationDeletedDataReponseType, SectorDeletedDataReponseType, UserDeletedDataresponseType } from "../IDeleteRecordIntegrationRepository";
import { IMessagaActivityRepository } from "../IMessageActivityRepository";
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
        private messagaActivityRepository: IMessagaActivityRepository,
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

}