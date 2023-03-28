import { Organization } from "../../domain/entities/Organization"

export interface IOrganizationId {
    id: string
}


export interface IOrganizationRepository {

    save(data: Organization): Promise<IOrganizationId | null>,
    findById(id: string): Promise<Organization | null>
    findByName(name: string): Promise<Organization | null>,
    findAll(): Promise<Organization[] | null>,
    findManyByIds(organizationIds: string[]): Promise<Organization[] | null>
    delete(organizationId: string): Promise<Organization | Error>,


}