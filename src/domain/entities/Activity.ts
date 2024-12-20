import { isAfter } from "date-fns";
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
    description?: string | null,
    created_at?: Date,
    updated_at?: Date,
    progress_status?: STATUSACTIVITY,
    due_date?: Date | null,
    start_date?: Date,
    conclusion_date?: Date | null,
    responsible_id: string,
    type_node?: TYPENODE,
    project_id: string,
    sector_id: string
}

export interface IActivityUpdateProps {
    id: string,
    title?: string,
    description?: string,
    created_at?: Date,
    updated_at?: Date,
    progress_status?: STATUSACTIVITY,
    due_date?: Date | null,
    start_date?: Date,
    responsible_id?: string,
    type_node?: TYPENODE,
    conclusion_date?: Date | null,
    project_id?: string,
    sector_id?: string | null,
}

export class Activity extends Entity<IActivityProps> {
    constructor(props: IActivityProps, id?: string) {
        super(props, id);
    }

    static create(props: IActivityProps, id?: string) {
        return new Activity({
            ...props,
            due_date: !props.due_date ? null : props.due_date,
            conclusion_date: !props.conclusion_date ? null : props.conclusion_date,
            created_at: props.created_at ?? new Date(),
            start_date: props.start_date ?? new Date(),
            updated_at: props.updated_at ?? new Date()
        }, id)
    }

    verifyPrecedenceValid(activityCompared: Activity) {
        if (this.props.created_at && activityCompared.props.created_at && !isAfter(this.props.created_at, activityCompared.props.created_at)) {
            return false
        }
        if (this.props.start_date && activityCompared.props.start_date && !isAfter(this.props.start_date, activityCompared.props.start_date)) {
            return false
        }
        return true
    }
}