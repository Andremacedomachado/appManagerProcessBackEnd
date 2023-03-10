import { IRoleRepository } from "../IRoleRepository";
import { IUserRepository } from "../IUserRepository";
import { IUserOnRolesRepository } from "../IUserOnRolesRepository";
import { IUserFullInfo, IUserIntegrationRepository, organizationInfo, roleInfo } from "../IUserIntegrationRepository";
import { IOrganizationSectorRepository } from "../IOrganizationSectorRepository";



export class PrismaUserIntegrationRepository implements IUserIntegrationRepository {
    constructor(
        private userRepository: IUserRepository,
        private roleRepository: IRoleRepository,
        private userOnRoleRepository: IUserOnRolesRepository,
        private organizationSectorRepository: IOrganizationSectorRepository
    ) {
    }
    async saveChange(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async createUserWithRole(): Promise<string | Error> {
        throw new Error("Method not implemented.");
    }
    async getFullInfoUser(id: string): Promise<Error | IUserFullInfo> {
        const useInfoInitial = await this.userRepository.findById(id);
        if (!useInfoInitial) {
            return new Error("User not exist");
        }
        const recordRoles = await this.userOnRoleRepository.findByUserId(useInfoInitial.id);
        const serctorAllocated = await this.organizationSectorRepository.findById(useInfoInitial.props.organization_sector_id);
        if (recordRoles) {
            const seacherIds = recordRoles.map(record => record.role_id)
            const roleInfo = await this.roleRepository.findManyByIds(seacherIds);
            const recordRoleInsert = roleInfo ? roleInfo.map((role, index) => {
                return {
                    roleId: role.id,
                    roleName: role.props.name,
                    adjusterId: recordRoles[index].adjuster_id,
                    dateLinkRole: recordRoles[index].created_at
                } as roleInfo;
            }) : [];


            const organizationInsert = {
                organizationId: serctorAllocated?.id,
                dateLinkSector: serctorAllocated?.props.created_at,
                organizationName: serctorAllocated?.props.name,
            } as organizationInfo;

            const userInfo: IUserFullInfo = {
                id: useInfoInitial.id,
                email: useInfoInitial.props.email,
                name: useInfoInitial.props.name,
                created_at: useInfoInitial.props.created_at,
                status: useInfoInitial.props.status,

                organization_linked: organizationInsert,
                roles: recordRoleInsert
            };

            return userInfo;
        } else {
            const organizationInsert = {
                organizationId: serctorAllocated?.id,
                dateLinkSector: serctorAllocated?.props.created_at,
                organizationName: serctorAllocated?.props.name,
            } as organizationInfo;

            const userInfo: IUserFullInfo = {
                id: useInfoInitial.id,
                email: useInfoInitial.props.email,
                name: useInfoInitial.props.name,
                created_at: useInfoInitial.props.created_at,
                status: useInfoInitial.props.status,

                organization_linked: organizationInsert,
                roles: [],
            };

            return userInfo;
        }
    }

}