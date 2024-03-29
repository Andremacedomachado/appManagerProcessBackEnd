import { hash } from 'bcryptjs';
import { IUserRepository, IUserUpdateManyProps, IUserUpdateProps, UserId } from '../IUserRepository';

import { prisma } from '../../../database';
import { User, UserIsActive } from '../../../domain/entities/User';


export class PrismaUserRepository implements IUserRepository {

    async save(user: User): Promise<UserId | null> {
        const { name, email, password, organization_sector_id, status } = user.props;
        const hashPassword = await hash(password, 8);

        const userCreated = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                organization_sector_id,
                status
            }
        });

        return { id: userCreated.id };
    }

    async findById(searchId: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: searchId
            }
        });
        if (!user) {
            return null;
        }
        const { id, name, email, created_at, updated_at, password, status, organization_sector_id } = user
        const userInMemory = User.create({
            name,
            email,
            created_at,
            updated_at,
            password,
            status: <UserIsActive>status,
            organization_sector_id
        }, id);

        return userInMemory;
    }

    async findByEmail(searchEmail: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: searchEmail
            }
        });
        if (!user) {
            return null;
        }

        const { id, name, email, created_at, updated_at, password, status, organization_sector_id } = user
        const userInMemory = User.create({
            name,
            email,
            created_at,
            updated_at,
            password,
            status: <UserIsActive>status,
            organization_sector_id
        }, id);

        return userInMemory;
    }

    async findAll(): Promise<User[] | null> {
        const users = await prisma.user.findMany({});
        if (users.length < 1) {
            return null;
        }
        const userCollection = [] as User[];
        users.forEach((user) => {
            const { id, name, email, created_at, updated_at, password, status, organization_sector_id } = user
            const userInMemory = User.create({
                name,
                email,
                created_at,
                updated_at,
                password,
                status: <UserIsActive>status,
                organization_sector_id
            }, id);
            userCollection.push(userInMemory);
        });
        return userCollection;
    }

    async update(userChangeData: IUserUpdateProps): Promise<User | null> {

        const userExists = await this.findById(userChangeData.id);
        if (!userExists) {
            return null;
        }

        if (userChangeData.email) {
            const userWithEmailInUse = await this.findByEmail(userChangeData.email);
            if (userWithEmailInUse && userChangeData.id != userWithEmailInUse.id) {
                return null;
            }
        }

        const userUpdatedInDatabase = await prisma.user.update({
            where: {
                id: userChangeData.id
            },
            data: {
                name: userChangeData.name || undefined,
                email: userChangeData.email || undefined,
                password: userChangeData.password || undefined,
                organization_sector_id: userChangeData.organization_sector_id || undefined,
                updated_at: new Date,
                status: userChangeData.status || undefined
            }
        })
        const { name, email, created_at, updated_at, password, status, organization_sector_id, id } = userUpdatedInDatabase
        const userUpdatedInMemory = User.create({
            name,
            email,
            created_at,
            updated_at,
            password,
            status: <UserIsActive>status,
            organization_sector_id
        }, id);

        return userUpdatedInMemory
    }

    async getManyBySector(sectorId: string): Promise<User[]> {
        const usersInSector = await prisma.user.findMany({
            where: {
                organization_sector_id: sectorId
            }
        })

        if (usersInSector.length == 0) {
            return [] as User[]
        }
        const userInMemory = usersInSector.map(userIndatabase => {
            const { created_at, email, id, name, organization_sector_id, password, status, updated_at } = userIndatabase
            return User.create({
                name,
                email,
                created_at,
                updated_at,
                password,
                status: <UserIsActive>status,
                organization_sector_id
            }, id)
        })
        return userInMemory
    }

    async updatedMany(userChangeData: IUserUpdateManyProps): Promise<User[]> {
        await prisma.user.updateMany({
            where: {
                id: {
                    in: userChangeData.ids
                }
            },
            data: {
                name: userChangeData.name || undefined,
                password: userChangeData.password || undefined,
                organization_sector_id: userChangeData.organization_sector_id == null || userChangeData.organization_sector_id ? userChangeData.organization_sector_id : undefined,
                updated_at: userChangeData.updated_at ?? new Date,
                status: userChangeData.status || undefined
            }
        });
        const userUpdated = await prisma.user.findMany({
            where: {
                id: { in: userChangeData.ids }
            }
        })
        const usersInMemory = userUpdated.map(user => {
            const { created_at, email, id, name, organization_sector_id, password, status, updated_at } = user;
            return User.create({ created_at, email, name, organization_sector_id, password, status: <UserIsActive>status, updated_at }, id)
        })
        return usersInMemory;
    }

    async findManyByCollenctionIds(userIds: string[]): Promise<User[]> {

        const userExists = await prisma.user.findMany({
            where: { id: { in: userIds } }
        })

        return userExists.map(user => {
            const { created_at, email, id, name, organization_sector_id, password, status, updated_at } = user;
            return User.create({ created_at, email, name, organization_sector_id, password, status: <UserIsActive>status, updated_at }, id)
        })
    }

    async delete(userId: string): Promise<User | Error> {
        try {
            const userDeleted = await prisma.$transaction(async tx => {
                const user = await tx.user.delete({
                    where: {
                        id: userId
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        password: true,
                        created_at: true,
                        status: true,
                        organization_sector_id: true,
                        updated_at: true,
                        registerAdjuster: true,
                        registerRole: true,
                        linked_sector: true,
                        Annex: true,
                        Collaborators: true,
                        MessageAtivity: true,
                        ActivitiesResponsible: true
                    }
                })
                var recordDenpendet = false;
                Object.values(user).forEach((propsWithRelation) => {
                    if (Array.isArray(propsWithRelation) && (propsWithRelation.length != 0)) {
                        recordDenpendet = true;
                    }
                })
                if (recordDenpendet) {
                    throw new Error('Record user with correlation record Dependent - oparation invalid')
                }
                return user
            })
            return User.create({ ...userDeleted, status: userDeleted.status as UserIsActive }, userDeleted.id);
        } catch (error) {
            return error as Error
        }
    }
}