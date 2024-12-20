import { NodeTypeActivity, Prisma, ProgressStatusActivity } from '@prisma/client';
import { prisma } from '../../../database';
import { IActivityProps, Activity, TYPENODE, STATUSACTIVITY, IActivityUpdateProps } from '../../../domain/entities/Activity';
import { IActivityId, IActivityQuery, IActivityRepository, IActivityUniqueContentProps } from '../IActivityRepository'
import { isValid } from 'date-fns';

export class PrismaActivityRepository implements IActivityRepository {
    async save(activity: Activity): Promise<IActivityId> {
        const { title, description, created_at, updated_at, due_date, start_date, progress_status, responsible_id, type_node, conclusion_date, project_id, sector_id }: IActivityProps = activity.props;

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
                conclusion_date,
                project_id,
                sector_id,
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
        const { title, description, created_at, updated_at, responsible_id, start_date, due_date, progress_status, type_node, conclusion_date, project_id, sector_id } = activityExists
        const activityInMemory = Activity.create({
            title,
            description: !description ? undefined : description,
            created_at,
            updated_at,
            responsible_id,
            start_date: !start_date ? undefined : start_date,
            due_date: !due_date ? undefined : due_date,
            progress_status: progress_status as unknown as STATUSACTIVITY,
            type_node: type_node as unknown as TYPENODE,
            conclusion_date,
            project_id,
            sector_id
        }, activityExists.id)

        return activityInMemory;
    }
    async findAll(): Promise<Activity[]> {

        const activitiesAllExists = await prisma.activity.findMany({});

        const activitiesInMemory: Activity[] = [];
        activitiesAllExists.forEach(activityInDatabase => {
            const { id, title, description, created_at, updated_at, responsible_id, start_date, due_date, progress_status, type_node, conclusion_date, project_id, sector_id } = activityInDatabase
            const activityInMemory = Activity.create({
                title,
                description: !description ? undefined : description,
                created_at,
                updated_at,
                responsible_id,
                due_date: !due_date ? undefined : due_date,
                start_date: !start_date ? undefined : start_date,
                progress_status: progress_status as unknown as STATUSACTIVITY,
                type_node: type_node as unknown as TYPENODE,
                conclusion_date,
                project_id,
                sector_id
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

        const { id, title, description, created_at, updated_at, start_date, due_date, progress_status, responsible_id, type_node, conclusion_date, project_id, sector_id } = activityInDatabase
        const activityInMemory = Activity.create({
            title: title,
            description: description || undefined,
            created_at: created_at || undefined,
            updated_at: updated_at || undefined,
            due_date: due_date || undefined,
            start_date: !start_date ? undefined : start_date,
            responsible_id: responsible_id,
            progress_status: progress_status as unknown as STATUSACTIVITY || undefined,
            type_node: type_node as unknown as TYPENODE,
            conclusion_date,
            project_id,
            sector_id
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

        const { id, title, description, created_at, updated_at, due_date, start_date, progress_status, responsible_id, type_node, conclusion_date, project_id, sector_id } = activityInDatabase
        const activityInMemory = Activity.create({
            title,
            description,
            created_at,
            updated_at,
            responsible_id,
            due_date,
            start_date: !start_date ? undefined : start_date,
            progress_status: progress_status as unknown as STATUSACTIVITY || undefined,
            type_node: type_node as unknown as TYPENODE,
            conclusion_date,
            project_id,
            sector_id
        }, id);

        return activityInMemory;
    }

    async update(activityChangeData: IActivityUpdateProps): Promise<Activity> {

        const activityUpdatedInDatabase = await prisma.activity.update({
            where: {
                id: activityChangeData.id
            },
            data: {
                title: activityChangeData.title || undefined,
                description: activityChangeData.description || undefined,
                created_at: activityChangeData.created_at || undefined,
                updated_at: activityChangeData.updated_at || undefined,
                due_date: activityChangeData.due_date,
                start_date: activityChangeData.start_date || undefined,
                responsible_id: activityChangeData.responsible_id || undefined,
                progress_status: activityChangeData.progress_status as unknown as ProgressStatusActivity || undefined,
                type_node: activityChangeData.type_node ? activityChangeData.type_node as unknown as NodeTypeActivity : undefined,
                conclusion_date: activityChangeData.conclusion_date,
                sector_id: activityChangeData.sector_id ? activityChangeData.sector_id : undefined,
                project_id: activityChangeData.project_id,

            }
        })
        const { id, title, description, created_at, updated_at, responsible_id, due_date, start_date, progress_status, type_node, conclusion_date, project_id, sector_id } = activityUpdatedInDatabase
        const activityUpdatedInMemory = Activity.create({
            title,
            description,
            created_at,
            updated_at,
            responsible_id,
            due_date,
            start_date: !start_date ? undefined : start_date,
            progress_status: progress_status as unknown as STATUSACTIVITY,
            type_node: type_node as unknown as TYPENODE,
            conclusion_date,
            project_id,
            sector_id
        }, id);

        return activityUpdatedInMemory;
    }

    async delete(activityId: string): Promise<Activity | Error> {
        try {
            const activityInMemory = await prisma.$transaction(async tx => {
                const activityData = await prisma.activity.delete({
                    where: {
                        id: activityId
                    },
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        due_date: true,
                        start_date: true,
                        created_at: true,
                        progress_status: true,
                        responsible_id: true,
                        type_node: true,
                        updated_at: true,
                        conclusion_date: true,
                        Annex: true,
                        Collaborators: true,
                        ChildrenRelationship: true,
                        ParentRelationship: true,
                        MessageAtivity: true,
                        project_id: true,
                        sector_id: true
                    }
                });

                const { id, title, description, created_at, updated_at, responsible_id, due_date, start_date, progress_status, type_node, conclusion_date, project_id, sector_id } = activityData;
                const activityDeletedInMemory = Activity.create({
                    title,
                    description: !description ? undefined : description,
                    created_at,
                    updated_at,
                    responsible_id,
                    due_date: !due_date ? undefined : due_date,
                    start_date: !start_date ? undefined : start_date,
                    progress_status: progress_status as STATUSACTIVITY,
                    type_node: type_node as TYPENODE,
                    conclusion_date,
                    project_id,
                    sector_id
                }, id);
                return activityDeletedInMemory
            })

            return activityInMemory
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
                return new Error('Operation invalid -  exists one or more records correlation with activity');

            }
            return error as Error
        }
    }

    async findMany(query: IActivityQuery): Promise<Activity[]> {
        const { keys, values } = query

        if (keys.length > 1 && values.length == 1) {
            const filterDate = { equals: values[0] } as Prisma.DateTimeFilter
            const filterString = {
                contains: values[0],
                mode: 'insensitive',
            } as Prisma.StringFilter;
            const filterNull = { equals: null } as Prisma.StringNullableFilter
            const filterFieldEnum = {
                equals: values[0]
            } as Prisma.EnumProgressStatusActivityFilter
            const activitiesMacth = await prisma.activity.findMany({
                where: {
                    OR: [
                        ...keys.map(k => {
                            if (values[0] instanceof Date) {
                                return { [k]: filterDate }
                            }
                            if (values[0] && (values[0] in STATUSACTIVITY || values[0] in TYPENODE)) {
                                return { [k]: filterFieldEnum }
                            }
                            if (values[0]) {

                                return { [k]: filterString }
                            }

                            return { [k]: filterNull }
                        })
                    ]
                }
            })

            const activitiesInMemory = activitiesMacth.map(activity => Activity.create({
                ...activity,
                progress_status: activity.progress_status as unknown as STATUSACTIVITY,
                type_node: activity.type_node as unknown as TYPENODE,
                due_date: activity.due_date,
                start_date: !activity.start_date ? undefined : activity.start_date,
                conclusion_date: activity.conclusion_date
            }, activity.id))

            return activitiesInMemory
        }

        else {
            console.log('infra valores pareados', keys, values, typeof keys, typeof values)
            const FilterCreated = keys.map((k, index) => {
                const filterDate = { equals: values[index] } as Prisma.DateTimeFilter
                const filterString = {
                    contains: values[index],
                    mode: 'insensitive',
                } as Prisma.StringFilter;
                const filterFieldEnum = {
                    equals: values[index]
                } as Prisma.EnumProgressStatusActivityFilter
                if (isValid(new Date(values[index] as string)) || values[index] instanceof Date) {
                    console.log("filter date", keys[index], filterDate)
                    return { [k]: filterDate }
                }
                if (values[index] && (values[index] in STATUSACTIVITY || values[index] in TYPENODE)) {
                    console.log("filter enum", keys[index])
                    return { [k]: filterFieldEnum }
                }
                console.log("filter string", keys[index], filterString)
                return { [k]: filterString }
            })

            console.log("filter", FilterCreated)
            const activitiesMacth = await prisma.activity.findMany({
                where: {
                    AND: [
                        ...FilterCreated
                    ]
                }
            })

            const activitiesInMemory = activitiesMacth.map(activity => Activity.create({
                ...activity,
                progress_status: activity.progress_status as unknown as STATUSACTIVITY,
                type_node: activity.type_node as unknown as TYPENODE,
                due_date: activity.due_date,
                start_date: !activity.start_date ? undefined : activity.start_date,
                conclusion_date: activity.conclusion_date
            }, activity.id))

            return activitiesInMemory
        }



    }
}