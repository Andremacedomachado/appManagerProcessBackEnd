import { prisma } from "../../../database";
import { Organization } from "../../../domain/entities/Organization";
import { IOrganizationId, IOrganizationRepository } from "../IOrganizationRepository";


export class PrismaOrganizationRepository implements IOrganizationRepository {
    async save(data: Organization): Promise<IOrganizationId | null> {

        const { name, employeesAllocated, created_at, updated_at } = data.props

        const organizationExists = await prisma.organization.findUnique({
            where: {
                name
            }
        })

        if (organizationExists) {
            return null;
        }

        const organization = await prisma.organization.create({
            data: {
                name,
                employees_allocated: employeesAllocated,
                created_at,
                updated_at,
            }
        });

        return { id: organization.id };

    }
    async findById(id: string): Promise<Organization | null> {
        const organization = await prisma.organization.findUnique({
            where: {
                id
            }
        });

        if (!organization) {
            return null
        }

        const organizationInMemory = Organization.create({
            name: organization.name,
            employeesAllocated: organization.employees_allocated,
            created_at: organization.created_at,
            updated_at: organization.updated_at
        }, organization.id)

        return organizationInMemory;
    }
    async findByName(name: string): Promise<Organization | null> {
        const organization = await prisma.organization.findFirst({
            where: {
                name
            }
        });

        if (!organization) {
            return null
        }

        const organizationInMemory = Organization.create({
            name: organization.name,
            employeesAllocated: organization.employees_allocated,
            created_at: organization.created_at,
            updated_at: organization.updated_at
        }, organization.id)

        return organizationInMemory;
    }
    async findAll(): Promise<Organization[] | null> {
        const organizations = await prisma.organization.findMany();

        if (organizations.length == 0) {
            return null
        }

        const organizationsInMemory: Organization[] = [];
        organizations.forEach(organization => {
            const organizationInmemory = Organization.create({
                name: organization.name,
                employeesAllocated: organization.employees_allocated,
                created_at: organization.created_at,
                updated_at: organization.updated_at
            }, organization.id)
            organizationsInMemory.push(organizationInmemory);
        })

        return organizationsInMemory;
    }
    async findManyByIds(organizationIds: string[]): Promise<Organization[] | null> {
        const organizationsInDatabase = await prisma.organization.findMany({
            where: {
                id: {
                    in: organizationIds
                }
            }
        });

        if (organizationsInDatabase.length == 0) {
            return null
        }

        const organizationsInMemory: Organization[] = [];
        organizationsInDatabase.forEach(organization => {
            const organizationInmemory = Organization.create({
                name: organization.name,
                employeesAllocated: organization.employees_allocated,
                created_at: organization.created_at,
                updated_at: organization.updated_at
            }, organization.id)
            organizationsInMemory.push(organizationInmemory);
        })

        return organizationsInMemory;
    }

    async delete(organizationId: string): Promise<Organization | Error> {
        try {
            const organizationExists = await prisma.organization.findUnique({
                where: {
                    id: organizationId
                }
            })

            if (!organizationExists) {
                return new Error('Organization not exists')
            }

            const organizationDeleted = await prisma.organization.delete({
                where: {
                    id: organizationId
                }
            })

            const { created_at, employees_allocated, name, updated_at, id } = organizationDeleted
            return Organization.create({ created_at, employeesAllocated: employees_allocated, name, updated_at }, id);

        } catch (error) {
            return error as Error
        }
    }
}