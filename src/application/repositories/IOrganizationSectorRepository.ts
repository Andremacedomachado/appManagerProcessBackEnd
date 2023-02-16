import { OrganizationSector } from "../../domain/entities/OrganizationSector"

export interface IOrganizationSectorId {
    id: string
}

export interface IOrganizationSectorRepository {
    save(data: OrganizationSector): Promise<IOrganizationSectorId | null>,
    findById(id: string): Promise<OrganizationSector | null>
    findByName(name: string): Promise<OrganizationSector | null>,
    findAll(): Promise<OrganizationSector[] | null>,
    findManyByIds(organizationIds: string[]): Promise<OrganizationSector[] | null>
}