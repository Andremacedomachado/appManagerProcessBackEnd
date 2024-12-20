import { Entity } from "./core/Entity";

export interface IProjectProps {
    title: string,
    description?: string | null
    created_at?: Date
    updated_at?: Date

}
export class Project extends Entity<IProjectProps> {
    constructor(props: IProjectProps, id?: string) {
        super(props, id);
    }

    static create(props: IProjectProps, id?: string) {
        return new Project({
            ...props,
            created_at: props.created_at ?? new Date(),
            updated_at: props.updated_at ?? new Date()
        }, id)
    }

}