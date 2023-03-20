import { prisma } from "../../../database";
import { Activity, STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity";
import { RecordCollaborator } from "../../../domain/entities/RecordCollaborator";
import { IActivityIntegrationRepository, IActivityTree, ICollectionActivityTreeFullInfo } from "../IActivityIntegrationRepository";
import { IActivityRepository } from "../IActivityRepository";
import { ICollaboratorRepository } from "../ICollaboratorReposytory";
import { IUserRepository } from "../IUserRepository";
import { ProgressStatusActivity, ActivityRelationship } from '@prisma/client';

export class PrismaActivityIntegrationRepository implements IActivityIntegrationRepository {
    constructor(
        private userRepository: IUserRepository,
        private collaboratorRepository: ICollaboratorRepository,
        private activityRepository: IActivityRepository
    ) { }
    saveChange(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAllActivityByUser(userId: string): Promise<ICollectionActivityTreeFullInfo | Error> {

        const userExists = await this.userRepository.findById(userId);

        if (!userExists) {
            return new Error('User dont exists!');
        }

        const allRecordsCollaborations = await this.collaboratorRepository.findByUserId(userId);

        if (!allRecordsCollaborations || allRecordsCollaborations.length == 0) {
            return {
                collectionsActivityTree: []
            } as ICollectionActivityTreeFullInfo;
        }

        var recordsNotFound = allRecordsCollaborations;
        const collectionTree = { collectionsActivityTree: [] } as ICollectionActivityTreeFullInfo;

        do {
            const actvityRootNode = await this.findRootNodeById(recordsNotFound[0].activity_id);
            if (!actvityRootNode) {
                return new Error('Error relacion colaborator and activity not exist')
            }

            const activitytreeInDatabase = await this.findTreeDescendant(actvityRootNode.id);
            if (!activitytreeInDatabase) {
                return new Error('Error activity not exist')
            }

            var actvityTree: IActivityTree = {
                activities: []
            };

            activitytreeInDatabase?.forEach(activityCurrent => {
                actvityTree.activities.push(activityCurrent);
            })

            const collaboratorsActivityTreeCurrent = await this.collaboratorRepository.findByActivityId(recordsNotFound[0].activity_id);
            actvityTree.collaborators = collaboratorsActivityTreeCurrent as RecordCollaborator[];
            collectionTree.collectionsActivityTree.push(actvityTree);

            recordsNotFound = recordsNotFound.filter(record => {
                return actvityTree.activities.every(activity => {
                    return activity.id !== record.activity_id
                })
            });

        } while (recordsNotFound.length > 0);

        return collectionTree;
    }

    async findTreeDescendant(activityId: string): Promise<Activity[] | null> {
        const activityRoot = await this.activityRepository.findById(activityId);
        if (!activityRoot) {
            return null;
        }

        const activityTreeDependency = await prisma.$queryRaw<ActivityRelationship[]>`WITH RECURSIVE parents(parent_id, children_id, dependency_link_date) AS (
            SELECT parent_id, children_id, dependency_link_date  FROM public."activityRelationship"
                WHERE parent_id = ${activityId}
          UNION ALL
            SELECT r.parent_id, r.children_id, r.dependency_link_date FROM public."activityRelationship" as r
                INNER JOIN parents ON   parents.children_id = r.parent_id
        )
        SELECT * FROM parents`;

        if (activityTreeDependency.length == 0) {
            return [activityRoot]
        }
        const collectionActivityIds: string[] = []
        activityTreeDependency.forEach((record, index) => {
            if (!collectionActivityIds.includes(record.parent_id)) {
                collectionActivityIds.push(record.parent_id)
            }
            if (!collectionActivityIds.includes(record.children_id)) {
                collectionActivityIds.push(record.children_id)
            }
        })
        const activitiesInDatabase = await prisma.activity.findMany({
            where: {
                id: {
                    in: collectionActivityIds
                }
            },
        });


        const activitiesInMemory = activitiesInDatabase.map(record => {
            const { id, title, responsible_id, created_at, description, due_date, progress_status, start_date, updated_at, type_node } = record
            return Activity.create({
                title,
                description: !description ? undefined : description,
                created_at,
                updated_at,
                responsible_id,
                due_date: !due_date ? undefined : due_date,
                start_date: !start_date ? undefined : start_date,
                progress_status: progress_status as STATUSACTIVITY,
                type_node: type_node as unknown as TYPENODE
            }, id);

        })

        return activitiesInMemory
    }

    async findRootNodeById(activityId: string): Promise<Activity | null> {
        const activityRoot = await this.activityRepository.findById(activityId);
        if (!activityRoot) {
            return null;
        }

        const activityTreeDependency = await prisma.$queryRaw<ActivityRelationship[]>`WITH RECURSIVE parents(parent_id, children_id, dependency_link_date) AS (
           SELECT parent_id, children_id, dependency_link_date  FROM public."activityRelationship"
                WHERE parent_id = ${activityId}
          UNION ALL
            SELECT r.parent_id, r.children_id, r.dependency_link_date FROM public."activityRelationship" as r
                INNER JOIN parents ON   parents.parent_id = r.children_id
        )
        SELECT * FROM parents`;

        if (activityTreeDependency.length == 0) {
            return activityRoot
        }

        const collectionActivityIds: string[] = []
        activityTreeDependency.forEach((record, index) => {
            if (!collectionActivityIds.includes(record.parent_id)) {
                collectionActivityIds.push(record.parent_id)
            }
            if (!collectionActivityIds.includes(record.children_id)) {
                collectionActivityIds.push(record.children_id)
            }
        })


        const activityInDatabase = await prisma.activity.findFirst({
            where: {
                AND: {
                    id: {
                        in: collectionActivityIds
                    },
                    type_node: 'INITIAL'
                }

            }
        })
        if (!activityInDatabase) {
            return null
        };
        const { id, title, responsible_id, created_at, description, due_date, progress_status, start_date, updated_at, type_node } = activityInDatabase
        const activityInMemory = Activity.create({
            title,
            description: !description ? undefined : description,
            created_at,
            updated_at,
            responsible_id,
            due_date: !due_date ? undefined : due_date,
            start_date: !start_date ? undefined : start_date,
            progress_status: progress_status as STATUSACTIVITY,
            type_node: type_node as unknown as TYPENODE
        }, id);

        return activityInMemory
    }

    async changeProcessStatusCascate(activityId: string): Promise<Error | null> {
        const activityTree = await this.findTreeDescendant(activityId);
        if (!activityTree) {
            return new Error('Activity dont exists!');
        }

        const collectionActivityIdToChange = activityTree.map(activity => activity.id);

        const resultTransaction = await prisma.activity.updateMany({
            where: {
                id: {
                    in: collectionActivityIdToChange
                },
                progress_status: {
                    equals: ProgressStatusActivity.DO_TO
                }
            },
            data: {
                progress_status: ProgressStatusActivity.CLOSED,
                updated_at: new Date()
            }
        });

        console.log(resultTransaction.count);
        if (resultTransaction.count == 0) {
            return new Error('Error transaction operation failed Or all records closed.')
        }

        return null;
    }

}