import { UserStatus } from "@prisma/client"
import { IUserProps, User } from "../../domain/entities/User"
import { GetUsersSchema } from "../usecases/getUsers/GetUsersDTO"

export type UserId = {
    id: string
}

export type IUserUpdateProps = {
    id: string
    name?: string,
    email?: string,
    password?: string,
    status?: UserStatus,
    created_at?: Date,
    updated_at?: Date,
    organization_sector_id?: string | null,
}
export type IUserUpdateManyProps = {
    ids: string[],
    name?: string,
    email?: string,
    password?: string,
    status?: UserStatus,
    created_at?: Date,
    updated_at?: Date,
    organization_sector_id?: string | null,
}
export interface IUserRepository {
    save(user: User): Promise<UserId | null>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    findAll(): Promise<User[] | null>
    update(user: IUserUpdateProps): Promise<User | null>
    getManyBySector(sectorId: string): Promise<User[]>
    updatedMany(dataChangeMany: IUserUpdateManyProps): Promise<User[]>
    findManyByCollenctionIds(userIds: string[]): Promise<User[]>
    findMany(search?: GetUsersSchema): Promise<User[]>
    delete(userId: string): Promise<User | Error>
}

export type keysUserField = Array<keyof (Omit<IUserProps, 'password'> & { id: string })>