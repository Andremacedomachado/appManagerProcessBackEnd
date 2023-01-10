import { Entity } from "./core/Entity";

export interface IRoleProps {
    name: string,
    description?: string,
    created_at?: Date,
    updated_at?: Date,
}

export class Role extends Entity<IRoleProps>{
    constructor(props: IRoleProps, id?: string) {
        super(props, id)
    }

    static create(props: IRoleProps, id?: string): Role {
        const role = new Role({
            ...props,
            created_at: props.created_at ?? new Date(),
            updated_at: props.updated_at ?? new Date(),
        }, id);
        return role;
    }
}