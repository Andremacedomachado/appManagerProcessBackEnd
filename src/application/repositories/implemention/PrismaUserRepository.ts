import { hash } from 'bcryptjs';
import { IUserRepository, IUserUpdateProps, UserId } from '../IUserRepository';

import { prisma } from '../../../database';
import { User, UserIsActive } from '../../../domain/entities/User';


export class PrismaUserRepository implements IUserRepository {

    async save(user: User): Promise<UserId | null> {
        const { name, email, password, organization_sector_id, status } = user.props;
        const hashPassword = await hash(password, 8);

        const userCreated = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                organization_sector_id,
                status
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
            status: <UserIsActive>status,
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
            status: <UserIsActive>status,
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
                status: <UserIsActive>status,
                organization_sector_id
            }, id);
            userCollection.push(userInMemory);
        });
        return userCollection;
    }

    async update(userChangeData: IUserUpdateProps): Promise<User | null> {

        const userExists = await this.findById(userChangeData.id);
        if (!userExists) {
            return null;
        }

        if (userChangeData.email) {
            const userWithEmailInUse = await this.findByEmail(userChangeData.email);
            if (userWithEmailInUse && userChangeData.id != userWithEmailInUse.id) {
                return null;
            }
        }

        const userUpdatedInDatabase = await prisma.user.update({
            where: {
                id: userChangeData.id
            },
            data: {
                name: userChangeData.name || undefined,
                email: userChangeData.email || undefined,
                password: userChangeData.password || undefined,
                updated_at: new Date,
                status: userChangeData.status || undefined
            }
        })
        const { name, email, created_at, updated_at, password, status, organization_sector_id, id } = userUpdatedInDatabase
        const userUpdatedInMemory = User.create({
            name,
            email,
            created_at,
            updated_at,
            password,
            status: <UserIsActive>status,
            organization_sector_id
        }, id);

        return userUpdatedInMemory
    }

    async getManyBySector(sectorId: string): Promise<User[]> {
        const usersInSector = await prisma.user.findMany({
            where: {
                organization_sector_id: sectorId
            }
        })

        if (usersInSector.length == 0) {
            return [] as User[]
        }
        const userInMemory = usersInSector.map(userIndatabase => {
            const { created_at, email, id, name, organization_sector_id, password, status, updated_at } = userIndatabase
            return User.create({
                name,
                email,
                created_at,
                updated_at,
                password,
                status: <UserIsActive>status,
                organization_sector_id
            }, id)
        })
        return userInMemory
    }
}