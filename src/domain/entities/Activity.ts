import { Entity } from "./core/Entity";

export enum TYPENODE {
    INITIAL = "INITIAL",
    FINALLY = 'FINALLY'
}

export enum STATUSACTIVITY {
    DO_TO = "DO_TO",
    CLOSED = "CLOSED"
}
export interface IActivityProps {
    title: string,
    description?: string,
    created_at?: Date,
    updated_at?: Date,
    progress_status?: STATUSACTIVITY,
    due_date?: Date,
    start_date?: Date,
    responsible_id: string,
    type_node?: TYPENODE
}


export class Activity extends Entity<IActivityProps>{
    constructor(props: IActivityProps, id?: string) {
        super(props, id);
    }

    static create(props: IActivityProps, id?: string) {
        return new Activity({
            ...props,
            created_at: props.created_at ?? new Date(),
            start_date: props.start_date ?? new Date(),
            updated_at: props.updated_at ?? new Date()
        }, id)
    }

}