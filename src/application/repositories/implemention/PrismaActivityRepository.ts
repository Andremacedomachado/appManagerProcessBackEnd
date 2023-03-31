import { NodeTypeActivity, Prisma, ProgressStatusActivity } from '@prisma/client';
import { prisma } from '../../../database';
import { IActivityProps, Activity, TYPENODE, STATUSACTIVITY } from '../../../domain/entities/Activity';
import { IActivityId, IActivityRepository, IActivityUniqueContentProps, IActivityUpdateProps } from '../IActivityRepository'

export class PrismaActivityRepository implements IActivityRepository {
    async save(activity: Activity): Promise<IActivityId | null> {
        const { title, description, created_at, updated_at, due_date, start_date, progress_status, responsible_id, type_node }: IActivityProps = activity.props;

        const activityInDatabase = await prisma.activity.create({
            data: {
                title,
                description,
                created_at,
                updated_at,
                due_date,
                start_date,
                responsible_id,
                progress_status: progress_status ? progress_status : ProgressStatusActivity.DO_TO,
                type_node: type_node ? type_node : NodeTypeActivity.INITIAL,
            }
        });

        return { id: activityInDatabase.id };
    }

    async findById(activityId: string): Promise<Activity | null> {
        const activityExists = await prisma.activity.findUnique({
            where: {
                id: activityId
            }
        })
        if (!activityExists) {
            return null;
        }
        const { title, description, created_at, updated_at, responsible_id, start_date, due_date, progress_status, type_node } = activityExists
        const activityInMemory = Activity.create({
            title,
            description: !description ? undefined : description,
            created_at,
            updated_at,
            responsible_id,
            start_date: !start_date ? undefined : start_date,
            due_date: !due_date ? undefined : due_date,
            progress_status: progress_status as unknown as STATUSACTIVITY,
            type_node: type_node as unknown as TYPENODE
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
            const { id, title, description, created_at, updated_at, responsible_id, start_date, due_date, progress_status, type_node } = activityInDatabase
            const activityInMemory = Activity.create({
                title,
                description: !description ? undefined : description,
                created_at,
                updated_at,
                responsible_id,
                due_date: !due_date ? undefined : due_date,
                start_date: !start_date ? undefined : start_date,
                progress_status: progress_status as unknown as STATUSACTIVITY,
                type_node: type_node as unknown as TYPENODE
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

        const { id, title, description, created_at, updated_at, start_date, due_date, progress_status, responsible_id, type_node } = activityInDatabase
        const activityInMemory = Activity.create({
            title: title,
            description: description || undefined,
            created_at: created_at || undefined,
            updated_at: updated_at || undefined,
            due_date: due_date || undefined,
            start_date: !start_date ? undefined : start_date,
            responsible_id: responsible_id,
            progress_status: progress_status as unknown as STATUSACTIVITY || undefined,
            type_node: type_node as unknown as TYPENODE
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

        const { id, title, description, created_at, updated_at, due_date, start_date, progress_status, responsible_id, type_node } = activityInDatabase
        const activityInMemory = Activity.create({
            title,
            description: !description ? undefined : description,
            created_at,
            updated_at,
            responsible_id,
            due_date: !due_date ? undefined : due_date,
            start_date: !start_date ? undefined : start_date,
            progress_status: progress_status as unknown as STATUSACTIVITY || undefined,
            type_node: type_node as unknown as TYPENODE
        }, id);

        return activityInMemory;
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
                progress_status: activityChangeData.progress_status as unknown as ProgressStatusActivity || undefined,
                type_node: activityChangeData.type_node ? activityChangeData.type_node as unknown as NodeTypeActivity : undefined
            }
        })
        const { id, title, description, created_at, updated_at, responsible_id, due_date, start_date, progress_status, type_node } = activityUpdatedInDatabase
        const activityUpdatedInMemory = Activity.create({
            title,
            description: !description ? undefined : description,
            created_at,
            updated_at,
            responsible_id,
            due_date: !due_date ? undefined : due_date,
            start_date: !start_date ? undefined : start_date,
            progress_status: progress_status as unknown as STATUSACTIVITY,
            type_node: type_node as unknown as TYPENODE
        }, id);

        return activityUpdatedInMemory;
    }

    async delete(activityId: string): Promise<Activity | Error> {
        try {
            const activityDeleted = await prisma.activity.delete({
                where: {
                    id: activityId
                }
            })

            const { id, title, description, created_at, updated_at, responsible_id, due_date, start_date, progress_status, type_node } = activityDeleted
            const activityDeletedInMemory = Activity.create({
                title,
                description: !description ? undefined : description,
                created_at,
                updated_at,
                responsible_id,
                due_date: !due_date ? undefined : due_date,
                start_date: !start_date ? undefined : start_date,
                progress_status: progress_status as STATUSACTIVITY,
                type_node: type_node as TYPENODE
            }, id);

            return activityDeletedInMemory
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
                return new Error('Operation invalid -  exists one or more records correlation with activity');

            }
            return error as Error
        }
    }

}