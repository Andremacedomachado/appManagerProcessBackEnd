import { IProjectProps, Project } from "../../domain/entities/Project";
import { IProjectQuery } from "../../domain/entities/QueryHelp";

export interface IProjectUpdatedData extends Partial<Omit<IProjectProps, "created_at"> & { id: string }> { }

export interface IProjectRepository {
    save(projectData: IProjectProps): Promise<Project>,
    findMany(query: IProjectQuery): Promise<Project[] | null>
    findById(id: string): Promise<Project | null>,
    update(id: string, dataPayload: IProjectUpdatedData): Promise<Project>,
    delete(id: string): Promise<Project>,
}