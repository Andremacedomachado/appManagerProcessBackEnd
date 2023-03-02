import { ProgressStatusActivity } from '@prisma/client';
import { prisma } from '../../../database';
import { IActivityProps, Activity } from '../../../domain/entities/Activity';
import { IActivityId, IActivityRepository, IActivityUniqueContentProps, IActivityUpdateProps } from '../IActivityRepository'

export class PrismaActivityRepository implements IActivityRepository {
    async save(activity: Activity): Promise<IActivityId | null> {
        const { title, description, created_at, updated_at, due_date, start_date, dependency_link_date, parent_activity_id, progress_status, responsible_id }: IActivityProps = activity.props;

        const activityInDatabase = await prisma.activity.create({
            data: {
                title,
                description,
                created_at,
                updated_at,
                due_date,
                start_date,
                dependency_link_date,
                parent_activity_id,
                responsible_id,
                progress_status: !progress_status ? undefined : progress_status as ProgressStatusActivity,
            }
        });

        return { id: activityInDatabase.id };
    }

    async findById(activityId: string): Promise<Activity | null> {
        const activityExists = await prisma.activity.findFirst({
            where: {
                id: activityId
            }
        })
        if (!activityExists) {
            return null;
        }
        const { title, description, created_at, updated_at, responsible_id, start_date, due_date, dependency_link_date, parent_activity_id, progress_status } = activityExists
        const activityInMemory = Activity.create({
            title,
            description: !description ? undefined : description,
            created_at,
            updated_at,
            responsible_id,
            dependency_link_date: !dependency_link_date ? undefined : dependency_link_date,
            start_date: !start_date ? undefined : start_date,
            due_date: !due_date ? undefined : due_date,
            parent_activity_id: !parent_activity_id ? undefined : parent_activity_id,
            progress_status
        }, activityExists.id)

        return activityInMemory;
    }
    async findAll(): Promise<Activity[] | null> {

        const activitiesAllExists = await prisma.activity.findMany({});
        if (activitiesAllExists.length == 0) {
            return null;
        }
        const activitiesInMemory: Activity[] = [];
        activitiesAllExists.forEach(activityInDatabase => {
            const { id, title, description, created_at, updated_at, responsible_id, start_date, due_date, dependency_link_date, parent_activity_id, progress_status } = activityInDatabase
            const activityInMemory = Activity.create({
                title,
                description: !description ? undefined : description,
                created_at,
                updated_at,
                responsible_id,
                dependency_link_date: !dependency_link_date ? undefined : dependency_link_date,
                due_date: !due_date ? undefined : due_date,
                start_date: !start_date ? undefined : start_date,
                parent_activity_id: !parent_activity_id ? undefined : parent_activity_id,
                progress_status
            }, id)
            activitiesInMemory.push(activityInMemory);
        })

        return activitiesInMemory;
    }
    async findByTitle(titleSearch: string): Promise<Activity | null> {
        const activityInDatabase = await prisma.activity.findFirst({
            where: {
                title: {
                    equals: titleSearch
                }
            }
        });
        if (!activityInDatabase) {
            return null;
        }

        const { id, title, description, created_at, updated_at, start_date, due_date, parent_activity_id, dependency_link_date, progress_status, responsible_id } = activityInDatabase
        const activityInMemory = Activity.create({
            title: title,
            description: description || undefined,
            created_at: created_at || undefined,
            updated_at: updated_at || undefined,
            due_date: due_date || undefined,
            start_date: !start_date ? undefined : start_date,
            responsible_id: responsible_id,
            parent_activity_id: parent_activity_id || undefined,
            dependency_link_date: dependency_link_date || undefined,
            progress_status: progress_status as ProgressStatusActivity || undefined,
        }, id)

        return activityInMemory;
    }
    async findUniqueForcontent(dataSearch: IActivityUniqueContentProps): Promise<Activity | null> {
        const activityInDatabase = await prisma.activity.findFirst({
            where: {
                AND: {
                    title: {
                        equals: dataSearch.title
                    },
                    created_at: {
                        equals: dataSearch.created_at
                    }
                }
            }
        });
        if (!activityInDatabase) {
            return null;
        }

        const { id, title, description, created_at, updated_at, due_date, start_date, parent_activity_id, dependency_link_date, progress_status, responsible_id } = activityInDatabase
        const activityInMemory = Activity.create({
            title,
            description: !description ? undefined : description,
            created_at,
            updated_at,
            responsible_id,
            dependency_link_date: !dependency_link_date ? undefined : dependency_link_date,
            due_date: !due_date ? undefined : due_date,
            start_date: !start_date ? undefined : start_date,
            parent_activity_id: !parent_activity_id ? undefined : parent_activity_id,
            progress_status
        }, id);

        return activityInMemory;
    }

    async findTreeDescendant(activityId: string): Promise<Object[] | null> {

        const activityRoot = await this.findById(activityId);
        if (!activityRoot) {
            return null;
        }

        const activityTree = await prisma.$queryRaw`WITH RECURSIVE parents(id, parent_activity_id, title) AS (
            SELECT id, parent_activity_id, title,description FROM activity
                WHERE id = ${activityId}
          UNION ALL
            SELECT a.id, a.parent_activity_id, a.title, a.description FROM activity as a
                INNER JOIN parents ON a.parent_activity_id = parents.id
        )
        SELECT * FROM parents`;
        return activityTree as Object[];
    }
    async update(activityChangeData: IActivityUpdateProps): Promise<Activity | null> {
        const activityInDatabase = await this.findById(activityChangeData.id);
        if (!activityInDatabase) {
            return null
        }

        const activityUpdatedInDatabase = await prisma.activity.update({
            where: {
                id: activityChangeData.id
            },
            data: {
                title: activityChangeData.title || undefined,
                description: activityChangeData.description || undefined,
                created_at: activityChangeData.created_at || undefined,
                updated_at: activityChangeData.updated_at || undefined,
                due_date: activityChangeData.due_date || undefined,
                start_date: activityChangeData.start_date || undefined,
                responsible_id: activityChangeData.responsible_id || undefined,
                parent_activity_id: activityChangeData.parent_activity_id || undefined,
                dependency_link_date: activityChangeData.dependency_link_date || undefined,
                progress_status: activityChangeData.progress_status as ProgressStatusActivity || undefined,
            }
        })
        const { id, title, description, created_at, updated_at, responsible_id, due_date, start_date, dependency_link_date, parent_activity_id, progress_status } = activityUpdatedInDatabase
        const activityUpdatedInMemory = Activity.create({
            title,
            description: !description ? undefined : description,
            created_at,
            updated_at,
            responsible_id,
            dependency_link_date: !dependency_link_date ? undefined : dependency_link_date,
            due_date: !due_date ? undefined : due_date,
            start_date: !start_date ? undefined : start_date,
            parent_activity_id: !parent_activity_id ? undefined : parent_activity_id,
            progress_status
        }, id);

        return activityUpdatedInMemory;
    }

}