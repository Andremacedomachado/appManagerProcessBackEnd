import { hash } from 'bcryptjs';
import { IUserRepository, UserId } from '../IUserRepository';

import { prisma } from '../../../database';
import { User } from '../../../domain/entities/User';


export class PrismaUserRepository implements IUserRepository {

    async save(user: User): Promise<UserId | null> {
        const { name, email, password, organization_sector_id } = user.props;
        const hashPassword = await hash(password, 8);

        const userCreated = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                organization_sector_id
            }
        });

        return { id: userCreated.id };
    }

    async findById(searchId: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: searchId
            }
        });
        if (!user) {
            return null;
        }
        const { id, name, email, created_at, updated_at, password, status, organization_sector_id } = user
        const userInMemory = User.create({
            name,
            email,
            created_at,
            updated_at,
            password,
            status,
            organization_sector_id
        }, id);

        return userInMemory;
    }

    async findByEmail(searchEmail: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: searchEmail
            }
        });
        if (!user) {
            return null;
        }

        const { id, name, email, created_at, updated_at, password, status, organization_sector_id } = user
        const userInMemory = User.create({
            name,
            email,
            created_at,
            updated_at,
            password,
            status,
            organization_sector_id
        }, id);

        return userInMemory;
    }

    async findAll(): Promise<User[] | null> {
        const users = await prisma.user.findMany({});
        if (users.length < 1) {
            return null;
        }
        const userCollection = [] as User[];
        users.forEach((user) => {
            const { id, name, email, created_at, updated_at, password, status, organization_sector_id } = user
            const userInMemory = User.create({
                name,
                email,
                created_at,
                updated_at,
                password,
                status,
                organization_sector_id
            }, id);
            userCollection.push(userInMemory);
        });
        return userCollection;
    }
}