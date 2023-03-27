import { Entity } from "./core/Entity";

export interface IOrganizationSectorProps {
    name: string,
    employeesAllocated: number,
    created_at?: Date,
    updated_at?: Date,
    organization_id: string | null
}

export class OrganizationSector extends Entity<IOrganizationSectorProps>{
    constructor(props: IOrganizationSectorProps, id?: string) {
        super(props, id)
    }

    static create(props: IOrganizationSectorProps, id?: string): OrganizationSector {
        const role = new OrganizationSector({
            ...props,
            created_at: props.created_at ?? new Date(),
            updated_at: props.updated_at ?? new Date(),
        }, id);
        return role;
    }
}