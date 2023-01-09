import { User } from "../../domain/entities/User"

export type UserId = {
    id: string
}

export interface IUserRepository {
    save(user: User): Promise<UserId | null>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    findAll(): Promise<User[] | null>
}