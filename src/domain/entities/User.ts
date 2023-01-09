import { Entity } from "./core/Entity"

export interface IUserProps {
    name: string,
    email: string,
    password: string,
    status: string,
    created_at?: Date,
    updated_at?: Date,
    organization_sector_id: string,
}


export class User extends Entity<IUserProps> {
    private constructor(props: IUserProps, id?: string) {
        super(props, id);
    }

    static create(props: IUserProps, id?: string) {
        const user = new User({
            ...props,
            created_at: props.created_at ?? new Date(),
            updated_at: props.updated_at ?? new Date()
        }, id)

        return user;
    }
}