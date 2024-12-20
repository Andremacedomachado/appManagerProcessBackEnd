import { Prisma } from "@prisma/client";
import { prisma } from "../../../database";
import { IProjectProps, Project } from "../../../domain/entities/Project";
import { IProjectQuery } from "../../../domain/entities/QueryHelp";
import { IProjectRepository, IProjectUpdatedData } from "../IProjectRepository";
import { isValid } from "date-fns";



export class PrismaProjectRepository implements IProjectRepository {
    async save(projectData: IProjectProps): Promise<Project> {
        const { title, created_at } = projectData
        const projectExist = await prisma.project.findFirst({
            where: {
                title,
                created_at
            }
        })

        if (projectExist) {
            throw new Error('Project already exists')
        }

        const projectCreatedInDatabase = await prisma.project.create({
            data: {
                ...projectData
            }
        })

        const projectInMemory = Project.create({ ...projectCreatedInDatabase }, projectCreatedInDatabase.id)
        return projectInMemory
    }

    async findMany(query: IProjectQuery): Promise<Project[] | null> {
        const { keys, values } = query

        if (keys.length > 1 && values.length == 1) {
            const filterDate = { equals: values[0] } as Prisma.DateTimeFilter
            const filterString = {
                contains: values[0],
                mode: 'insensitive',
            } as Prisma.StringFilter;
            const filterNull = { equals: null } as Prisma.StringNullableFilter
            const projectsMacth = await prisma.project.findMany({
                where: {
                    OR: [
                        ...keys.map(k => {
                            if (values[0] instanceof Date) {
                                return { [k]: filterDate }
                            }
                            if (values[0]) {

                                return { [k]: filterString }
                            }

                            return { [k]: filterNull }
                        })
                    ]
                }
            })

            const projectsInMemory = projectsMacth.map(project => Project.create({
                ...project,
            }, project.id))

            return projectsInMemory
        }
        else {
            const FilterCreated = keys.map((k, index) => {
                const filterDate = { equals: values[index] } as Prisma.DateTimeFilter
                const filterString = {
                    contains: values[index],
                    mode: 'insensitive',
                } as Prisma.StringFilter;
                if (isValid(new Date(values[index] as string)) || values[index] instanceof Date) {
                    console.log("filter date", keys[index], filterDate)
                    return { [k]: filterDate }
                }
                return { [k]: filterString }
            })

            const projectsMacth = await prisma.project.findMany({
                where: {
                    AND: [
                        ...FilterCreated
                    ]
                }
            })

            const projectsInMemory = projectsMacth.map(project => Project.create({
                ...project,

            }, project.id))

            return projectsInMemory
        }
    }

    async findById(id: string): Promise<Project | null> {
        const projectFoundInDatabase = await prisma.project.findUnique({
            where: {
                id
            }
        })

        if (!projectFoundInDatabase) {
            return projectFoundInDatabase
        }

        return Project.create({ ...projectFoundInDatabase }, projectFoundInDatabase.id)
    }

    async update(id: string, dataPayload: IProjectUpdatedData): Promise<Project> {
        const projectExists = await this.findById(id)
        if (!projectExists) {
            throw new Error("Project does not exist")
        }

        const projectUpdatedInDatabase = await prisma.project.update({
            where: {
                id
            },
            data: {
                ...dataPayload
            }
        })

        return Project.create(projectUpdatedInDatabase, projectUpdatedInDatabase.id)
    }
    async delete(id: string): Promise<Project> {
        const projectDeleted = await prisma.project.delete({
            where: {
                id
            }
        })

        return Project.create(projectDeleted, projectDeleted.id)
    }
}