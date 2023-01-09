import { hash } from "bcryptjs";

import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";


export class CreateUserUseCase {

    constructor(private userRepository: IUserRepository) {
    };

    async execute(data: ICreateUserRequestDTO) {
        const userExists = await this.userRepository.findByEmail(data.email);
        if (userExists) {
            return new Error('User alread existed')
        }

        const { name, email, status, created_at, updated_at, organization_sector_id } = data
        const password = await hash(data.password, 8)

        const user = User.create({
            name,
            email,
            status,
            password,
            created_at,
            updated_at,
            organization_sector_id
        })
        const userIdOrNull = await this.userRepository.save(user);
        if (!userIdOrNull) {
            return new Error("Erro insert data on database");
        }

        return userIdOrNull;
    }
}