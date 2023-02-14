import { prisma } from "../../../database";
import { RecordRole, IRecordRoleProps } from "../../../domain/entities/RecordRole";
import { IUserOnRolesRepository } from "../IUserOnRolesRepository";


export class PrismaUserOnRolesRepository implements IUserOnRolesRepository {
    async save(rolesIds: string[], userId: string, adjusterId: string): Promise<null | Error> {
        const roleExists = await prisma.role.findMany({
            where: {
                id: {
                    in: rolesIds
                }
            }
        });

        if (roleExists.length != rolesIds.length) {
            return new Error('One or more roles not exist',)
        }

        const recordsRoleCurrent = await prisma.usersOnRoles.findMany({
            where: {
                user_id: userId
            }
        });

        const allRecordsNotInserted = rolesIds.filter(seachRole => {
            return recordsRoleCurrent.every(record => {
                return record.role_id !== seachRole
            })
        })

        const dataInsert = allRecordsNotInserted.map(role_id => {
            return {
                role_id,
                user_id: userId,
                adjuster_id: adjusterId,
                created_at: new Date
            } as IRecordRoleProps
        })
        const countRecordsInseted = await prisma.usersOnRoles.createMany({
            data: dataInsert
        })

        if (countRecordsInseted.count != dataInsert.length) {
            return new Error(" Error insert records");
        }



        return null;

    };
    async replaceAll(rolesId: string[], userId: string, adjusterId: string): Promise<null | Error> {
        const userExist = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!userExist) {
            return new Error('User not exists');
        }

        const roleExists = await prisma.role.findMany({
            where: {
                id: {
                    in: rolesId
                }
            }
        })
        if (roleExists.length != rolesId.length) {
            return new Error('Roles not exists');
        }

        const dataInsert = rolesId.map(roleId => RecordRole.create({
            role_id: roleId,
            user_id: userId,
            adjuster_id: adjusterId,
            created_at: new Date
        }))

        const resultTransactions = await prisma.$transaction([
            prisma.usersOnRoles.deleteMany({
                where: {
                    user_id: {
                        in: userId
                    }
                }
            }),
            prisma.usersOnRoles.createMany({
                data: dataInsert
            })
        ]);

        if (resultTransactions[1].count != rolesId.length) {
            return new Error('Error transactions in database');
        }

        return null
    }
    async findByUserId(userId: string): Promise<RecordRole[] | null> {
        const recordRole = await prisma.usersOnRoles.findMany({
            where: {
                user_id: userId
            }
        });
        const recordsRoles = recordRole.map(recordInDataBase => {
            return RecordRole.create(recordInDataBase);

        })
        return recordsRoles;
    };

    async findByRoleId(roleId: string): Promise<RecordRole[] | null> {
        const recordRole = await prisma.usersOnRoles.findMany({
            where: {
                role_id: roleId
            }
        });
        const recordsRoles = recordRole.map(recordInDataBase => RecordRole.create(recordInDataBase));
        return recordsRoles;
    }
    async findAll(): Promise<RecordRole[] | null> {
        const recordsInDataBase = await prisma.usersOnRoles.findMany({});
        if (recordsInDataBase.length == 0) {
            return null
        }
        const recordsRoles = recordsInDataBase.map(record => RecordRole.create(record))
        return recordsRoles;
    }

}