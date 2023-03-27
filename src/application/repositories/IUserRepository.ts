import { UserStatus } from "@prisma/client"
import { User } from "../../domain/entities/User"

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

export interface IUserRepository {
    save(user: User): Promise<UserId | null>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    findAll(): Promise<User[] | null>
    update(user: IUserUpdateProps): Promise<User | null>
    getManyBySector(sectorId: string): Promise<User[]>
}