import { prisma } from "../../../database";
import { RecordDependency } from "../../../domain/entities/RecordDependency";
import { IActivityRelationRepository, IRecordDependecyIdProps } from "../IActivityRelationRepository";

export class PrismaActivityRelationRepository implements IActivityRelationRepository {
    async save(recordDependency: RecordDependency): Promise<IRecordDependecyIdProps | null> {
        const recordId = { parent_id: recordDependency.parent_id, children_id: recordDependency.parent_id } as IRecordDependecyIdProps
        const activityRelationExists = await prisma.activityRelationship.findUnique({
            where: {
                parent_id_children_id: recordId
            }
        })

        if (!activityRelationExists) {
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

        return recordId;
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
    async delete(recordDependency: RecordDependency): Promise<RecordDependency | null> {
        const recordDeletedInDatabase = await prisma.activityRelationship.delete({
            where: {
                parent_id_children_id: {
                    parent_id: recordDependency.parent_id,
                    children_id: recordDependency.children_id
                }
            }
        })
        const recordInMemory = RecordDependency.create(recordDeletedInDatabase);

        return recordInMemory;
    }
    async deleteByCorrelationId(searchId: string): Promise<Error | null | number> {
        const activityExists = await prisma.activity.findUnique({
            where: {
                id: searchId
            }
        })

        if (!activityExists) {
            return null;
        }
        const [quantityFoundRecord, deletePayload] = await prisma.$transaction([
            prisma.activityRelationship.count({
                where: {
                    OR: {
                        parent_id: searchId,
                        children_id: searchId,
                    }
                }
            }),
            prisma.activityRelationship.deleteMany({
                where: {
                    OR: {
                        parent_id: searchId,
                        children_id: searchId,
                    }
                }
            })
        ]);

        if (quantityFoundRecord != deletePayload.count) {
            return new Error('Error trasaction operation - records not deleted')
        }
        return deletePayload.count;
    }

}