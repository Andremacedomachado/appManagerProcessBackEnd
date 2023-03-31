import { Prisma } from "@prisma/client";
import { prisma } from "../../../database";
import { RecordDependency } from "../../../domain/entities/RecordDependency";
import { IActivityRelationRepository, IRecordDependecyIdProps } from "../IActivityRelationRepository";

export class PrismaActivityRelationRepository implements IActivityRelationRepository {
    async save(recordDependency: RecordDependency): Promise<IRecordDependecyIdProps | null> {
        const recordId = { parent_id: recordDependency.parent_id, children_id: recordDependency.children_id } as IRecordDependecyIdProps
        const activityRelationExists = await prisma.activityRelationship.findUnique({
            where: {
                parent_id_children_id: recordId
            }
        })

        if (activityRelationExists) {
            return null
        }

        const { parent_id, children_id, dependency_linked_date } = recordDependency;

        const recordRelationInDatabase = await prisma.activityRelationship.create({
            data: {
                parent_id,
                children_id,
                dependency_link_date: dependency_linked_date ? dependency_linked_date : new Date()
            }
        });

        return RecordDependency.create(recordRelationInDatabase);
    }
    async findByParentId(parent_id: string): Promise<RecordDependency[] | null> {
        const activityExists = await prisma.activity.findUnique({
            where: {
                id: parent_id
            }
        });

        if (!activityExists) {
            return null;
        }

        const collectionActivityRelations = await prisma.activityRelationship.findMany({
            where: {
                parent_id
            }
        });
        return collectionActivityRelations.map(recordInDatabase => RecordDependency.create(recordInDatabase))
    }
    async findByChildrenId(children_id: string): Promise<RecordDependency[] | null> {
        const activityExists = await prisma.activity.findUnique({
            where: {
                id: children_id
            }
        });

        if (!activityExists) {
            return null;
        }

        const collectionActivityRelations = await prisma.activityRelationship.findMany({
            where: {
                children_id
            }
        });

        return collectionActivityRelations.map(recordInDatabase => RecordDependency.create(recordInDatabase))

    }

    async delete(recordId: IRecordDependecyIdProps): Promise<RecordDependency | Error> {
        try {
            const recordDeletedInDatabase = await prisma.activityRelationship.delete({
                where: {
                    parent_id_children_id: recordId
                }
            })
            const recordInMemory = RecordDependency.create(recordDeletedInDatabase);

            return recordInMemory;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == "P2025") {
                return new Error("Record to delete does not exist");
            }

            return error as Error;
        }
    }

    async deleteByCorrelationId(searchId: string): Promise<RecordDependency[] | Error> {
        try {

            const recordRelationDeleted = await prisma.$transaction(async (tx) => {
                const dependencyCorrelation = await tx.activityRelationship.findMany({
                    where: {
                        OR: [
                            { parent_id: searchId },
                            { children_id: searchId },
                        ]
                    }
                });

                const payloadDeleted = await tx.activityRelationship.deleteMany({
                    where: {
                        OR: [
                            { parent_id: searchId },
                            { children_id: searchId },
                        ]
                    }
                })

                return dependencyCorrelation;
            });


            return recordRelationDeleted.map(relation => RecordDependency.create({ ...relation }));
        } catch (error) {
            return error as Error
        }
    }

}