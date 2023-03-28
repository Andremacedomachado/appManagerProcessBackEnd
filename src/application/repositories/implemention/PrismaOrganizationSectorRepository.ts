import { Prisma } from "@prisma/client";
import { prisma } from "../../../database";
import { OrganizationSector } from "../../../domain/entities/OrganizationSector";

import { IOrganizationSectorId, IOrganizationSectorRepository } from "../IOrganizationSectorRepository";


export class PrismaOrganizationSectorRepository implements IOrganizationSectorRepository {
    async save(data: OrganizationSector): Promise<IOrganizationSectorId | null> {
        const { name, employeesAllocated, created_at, updated_at, organization_id } = data.props

        const sectorExists = await prisma.organizationSector.findUnique({
            where: {
                name
            }
        })

        if (sectorExists) {
            return null;
        }

        const sector = await prisma.organizationSector.create({
            data: {
                name,
                employees_allocated: employeesAllocated,
                created_at,
                updated_at,
                organization_id
            }
        });

        return { id: sector.id };
    }

    async findById(id: string): Promise<OrganizationSector | null> {
        const sector = await prisma.organizationSector.findUnique({
            where: {
                id
            }
        });

        if (!sector) {
            return null
        }

        const sectorInMemory = OrganizationSector.create({
            name: sector.name,
            employeesAllocated: sector.employees_allocated,
            created_at: sector.created_at,
            updated_at: sector.updated_at,
            organization_id: sector.organization_id
        }, sector.id)

        return sectorInMemory;
    }

    async findByName(name: string): Promise<OrganizationSector | null> {
        const sector = await prisma.organizationSector.findFirst({
            where: {
                name
            }
        });

        if (!sector) {
            return null
        }

        const sectorInMemory = OrganizationSector.create({
            name: sector.name,
            employeesAllocated: sector.employees_allocated,
            created_at: sector.created_at,
            updated_at: sector.updated_at,
            organization_id: sector.organization_id
        }, sector.id)

        return sectorInMemory;
    }
    async findAll(): Promise<OrganizationSector[] | null> {
        const sector = await prisma.organizationSector.findMany();

        if (sector.length == 0) {
            return null
        }

        const sectorsInMemory: OrganizationSector[] = [];
        sector.forEach(sector => {
            const organizationInmemory = OrganizationSector.create({
                name: sector.name,
                employeesAllocated: sector.employees_allocated,
                created_at: sector.created_at,
                updated_at: sector.updated_at,
                organization_id: sector.organization_id
            }, sector.id)
            sectorsInMemory.push(organizationInmemory);
        })

        return sectorsInMemory;
    }
    async findManyByIds(sectorIds: string[]): Promise<OrganizationSector[] | null> {
        const sectorsInDatabase = await prisma.organizationSector.findMany({
            where: {
                id: {
                    in: sectorIds
                }
            }
        });

        if (sectorsInDatabase.length == 0) {
            return null
        }

        const sectorsInMemory: OrganizationSector[] = [];
        sectorsInDatabase.forEach(sector => {
            const organizationInmemory = OrganizationSector.create({
                name: sector.name,
                employeesAllocated: sector.employees_allocated,
                created_at: sector.created_at,
                updated_at: sector.updated_at,
                organization_id: sector.organization_id
            }, sector.id)
            sectorsInMemory.push(organizationInmemory);
        })

        return sectorsInMemory;
    }

    async findSectorsByOrganizationId(organizationId: string): Promise<OrganizationSector[]> {
        const sectorsInDatabase = await prisma.organizationSector.findMany({
            where: {
                organization_id: organizationId
            }
        });

        if (sectorsInDatabase.length == 0) {
            return [] as OrganizationSector[]
        }

        const sectorsInMemory = sectorsInDatabase.map(sector => {
            const { created_at, employees_allocated, id, name, organization_id, updated_at } = sector
            return OrganizationSector.create({ created_at, employeesAllocated: employees_allocated, name, organization_id, updated_at }, id)
        })

        return sectorsInMemory;
    }

    async findAllSectorByOrganization(organization_id: string): Promise<OrganizationSector[] | Error> {
        const sectorsInDatabase = await prisma.organizationSector.findMany({
            where: {
                organization_id
            }
        })

        if (sectorsInDatabase.length == 0) {
            return new Error('Organization without Sectors or Organization not exists')
        }

        const sectorsInMemory = sectorsInDatabase.map(sector => {
            const { id, created_at, employees_allocated, name, organization_id, updated_at } = sector
            return OrganizationSector.create({ created_at, employeesAllocated: employees_allocated, name, organization_id, updated_at }, id);
        });

        return sectorsInMemory;
    }
}