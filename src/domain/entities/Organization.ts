import { Entity } from "./core/Entity";

export interface IOrganizationProps {
    name: string,
    employeesAllocated: number,
    created_at?: Date,
    updated_at?: Date,
}

export class Organization extends Entity<IOrganizationProps>{
    constructor(props: IOrganizationProps, id?: string) {
        super(props, id)
    }

    static create(props: IOrganizationProps, id?: string): Organization {
        const role = new Organization({
            ...props,
            created_at: props.created_at ?? new Date(),
            updated_at: props.updated_at ?? new Date(),
        }, id);
        return role;
    }
}