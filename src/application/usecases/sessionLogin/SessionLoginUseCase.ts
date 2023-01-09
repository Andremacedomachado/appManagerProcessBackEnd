import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { IUserRepository } from "../../repositories/IUserRepository";
import { ISessionLoginRequestDTO } from "./SessionLoginDTO";

export class SessionLoginUseCase {

    constructor(private userRepository: IUserRepository) {
    }

    async excute(data: ISessionLoginRequestDTO): Promise<string | Error> {

        const usertExists = await this.userRepository.findByEmail(data.email);

        if (!usertExists) {
            return new Error('User ou exist');
        }
        const passwordMatch = await compare(data.password, usertExists.props.password);
        if (!passwordMatch) {
            return new Error('User or password incorrect');
        }

        const secret_key = process.env.SECRET_JWT;

        if (!secret_key) {
            return new Error('Error internal');
        }
        const token = sign({}, secret_key, {
            expiresIn: '1H',
            subject: usertExists.id
        });

        return token;

    }
}