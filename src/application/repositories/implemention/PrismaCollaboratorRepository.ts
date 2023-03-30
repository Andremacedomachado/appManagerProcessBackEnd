import { prisma } from "../../../database";
import { IRecordCollaboratorProps, RecordCollaborator } from "../../../domain/entities/RecordCollaborator";
import { ICollaboratorRepository, IFilterCollaboratorProps } from "../ICollaboratorReposytory";
import { Prisma } from "@prisma/client"

export class PrismaCollaboratorRepository implements ICollaboratorRepository {
    async save(userIds: string[], activityId: string): Promise<Error | null> {
        const activityExists = await prisma.activity.findUnique({
            where: {
                id: activityId
            }
        });

        if (!activityExists) {
            return new Error('Activity dont exist',)
        }
        const usersExists = await prisma.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            }
        });
        if (usersExists.length != userIds.length) {
            return new Error('One or more Users dont exist',)
        }

        const recordsCollaboratorCurrent = await prisma.collaborators.findMany({
            where: {
                activity_id: activityId
            }
        });

        if (recordsCollaboratorCurrent.length > 0) {
            const allRecordsNotInserted = userIds.filter(searchCollaborators => {
                return recordsCollaboratorCurrent.every(record => {
                    return record.user_id !== searchCollaborators
                })
            })

            const dataInsert = allRecordsNotInserted.map(user_id => {
                return {
                    activity_id: activityId,
                    user_id,
                } as IRecordCollaboratorProps
            })

            const countRecordsInseted = await prisma.collaborators.createMany({
                data: dataInsert
            })

            if (countRecordsInseted.count != dataInsert.length) {
                return new Error(" Error insert records");
            }
        }
        else {
            const dataInsert = userIds.map(user_id => {
                return {
                    user_id,
                    activity_id: activityId,
                } as IRecordCollaboratorProps
            })
            const countRecordsInseted = await prisma.collaborators.createMany({
                data: dataInsert
            })

            if (countRecordsInseted.count != dataInsert.length) {
                return new Error(" Error insert records");
            }
        }


        return null;
    }

    async replaceAll(userIds: string[], activityId: string): Promise<Error | null> {
        const activityExists = await prisma.activity.findUnique({
            where: {
                id: activityId
            }
        });

        if (!activityExists) {
            return new Error('Activity dont exist',)
        }
        const usersExists = await prisma.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            }
        });
        if (usersExists.length != userIds.length) {
            return new Error('One or more Users dont exist',)
        }

        const dataInsert = userIds.map(userId => RecordCollaborator.create({
            user_id: userId,
            activity_id: activityId,
        }))

        const resultTransactions = await prisma.$transaction([
            prisma.collaborators.deleteMany({
                where: {
                    AND: {
                        user_id: {
                            in: userIds
                        },
                        activity_id: activityId
                    }
                }
            }),
            prisma.collaborators.createMany({
                data: dataInsert
            })
        ]);

        if (resultTransactions[1].count != userIds.length) {
            return new Error('Error transactions in database');
        }

        return null
    }

    async findByUserId(userId: string): Promise<RecordCollaborator[] | null> {
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!userExists) {
            return null
        }
        const recordExists = await prisma.collaborators.findMany({
            where: {
                user_id: userId
            }
        });
        const recordsCollaboratorInMemory: RecordCollaborator[] = [];
        if (recordExists.length == 0) {
            return recordsCollaboratorInMemory;
        }

        recordExists.forEach(recordInDatabase => {
            const { user_id, activity_id } = recordInDatabase;
            const recordInMemory = RecordCollaborator.create({ user_id, activity_id });
            recordsCollaboratorInMemory.push(recordInMemory);
        });

        return recordsCollaboratorInMemory;
    }

    async findByActivityId(activityId: string): Promise<RecordCollaborator[] | null> {
        const activityExists = await prisma.activity.findUnique({
            where: {
                id: activityId
            }
        });
        if (!activityExists) {
            return null
        }
        const recordExists = await prisma.collaborators.findMany({
            where: {
                activity_id: activityId
            }
        });
        const recordsCollaboratorInMemory: RecordCollaborator[] = [];
        if (recordExists.length == 0) {
            return recordsCollaboratorInMemory;
        }

        recordExists.forEach(recordInDatabase => {
            const { user_id, activity_id } = recordInDatabase;
            const recordInMemory = RecordCollaborator.create({ user_id, activity_id });
            recordsCollaboratorInMemory.push(recordInMemory);
        });

        return recordsCollaboratorInMemory;
    }

    async findAll(): Promise<RecordCollaborator[] | null> {
        const recordsExists = await prisma.collaborators.findMany();

        if (recordsExists.length == 0) {
            return null
        }
        return recordsExists
    }

    async delete(recordCollaborator: IRecordCollaboratorProps): Promise<RecordCollaborator | Error> {
        try {

            const recordDeleted = await prisma.collaborators.delete({
                where: {
                    user_id_activity_id: recordCollaborator
                }
            });

            return RecordCollaborator.create({ ...recordCollaborator });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code == "P2025") {
                    return new Error("Record not exist")
                }
            }
            return error as Error
        }
    }

    async deleteMany(filter: IFilterCollaboratorProps): Promise<RecordCollaborator[] | Error> {
        try {
            const filterValid = Object.values(filter).every(field => field !== undefined);
            if (!filterValid) {
                throw new Error('Filter invalid - please inform at least one field with value')
            }

            const collaboratorInDelete = await prisma.$transaction(async (tx) => {
                const collaboratorsFound = await tx.collaborators.findMany({
                    where: filter
                });

                const payloadDelete = await tx.collaborators.deleteMany({
                    where: filter
                });
                return collaboratorsFound
            })

            return collaboratorInDelete.map(collaborator => RecordCollaborator.create({ ...collaborator }))
        } catch (errors) {
            return errors as Error
        }
    }

}