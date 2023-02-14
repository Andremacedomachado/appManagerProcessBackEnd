import { prisma } from "../../../database";
import { Role } from "../../../domain/entities/Role";
import { IRoleRepository, RoleId } from "../IRoleRepository";


export class PrismaRoleRepository implements IRoleRepository {
    async save(data: Role): Promise<RoleId | null> {
        const { name, description, created_at, updated_at } = data.props

        const roleInDatabase = await prisma.role.create({
            data: {
                name,
                description,
                created_at,
                updated_at
            }
        })

        return { id: roleInDatabase.id };

    }
    async findById(id: string): Promise<Role | null> {
        const roleInDatabase = await prisma.role.findUnique({
            where: {
                id
            }
        })
        if (!roleInDatabase) {
            return null;
        }

        const { name, description, created_at, updated_at } = roleInDatabase
        const roleInMemory = Role.create({
            name,
            description: description ?? undefined,
            created_at,
            updated_at
        }, roleInDatabase.id);

        return roleInMemory;
    }
    async findByName(seachName: string): Promise<Role | null> {
        const roleInDatabase = await prisma.role.findUnique({
            where: {
                name: seachName
            }
        })
        if (!roleInDatabase) {
            return null;
        }

        const { name, description, created_at, updated_at } = roleInDatabase
        const roleInMemory = Role.create({
            name,
            description: description ?? undefined,
            created_at,
            updated_at
        }, roleInDatabase.id);

        return roleInMemory;
    }
    async findAll(): Promise<Role[] | null> {
        const rolesInDatabase = await prisma.role.findMany()
        var rolesInMemory: Role[] = [];

        if (rolesInDatabase.length = 0) {
            return null
        }

        rolesInDatabase.forEach(role => {
            const { id, name, description, created_at, updated_at } = role
            const roleInMemory = Role.create({
                name,
                description: description ?? undefined,
                created_at,
                updated_at
            }, id);
            rolesInMemory.push(roleInMemory);
        })

        return rolesInMemory;
    }

    async findManyByIds(rolesId: string[]): Promise<Role[] | null> {

        const roles = await prisma.role.findMany({
            where: {
                id: {
                    in: rolesId
                }
            }
        })

        const rolesInMemory: Role[] = []
        roles.forEach(roleData => {
            const role = Role.create({
                name: roleData.name,
                description: roleData.description ?? undefined,
                created_at: roleData.created_at,
                updated_at: roleData.updated_at
            }, roleData.id);
            rolesInMemory.push(role);
        })

        return rolesInMemory;
    }

}