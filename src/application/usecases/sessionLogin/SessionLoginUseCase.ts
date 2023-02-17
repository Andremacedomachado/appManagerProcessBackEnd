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
        if (usertExists.props.status != process.env.USER_STATUS_ACTIVE) {
            return new Error('User not permission access application - contact administrator')
        }
        const passwordMatch = await compare(data.password, usertExists.props.password);
        if (!passwordMatch) {
            return new Error('User or password incorrect');
        }

        const secret_key = process.env.SECRET_JWT;

        if (!secret_key) {
            return new Error('Error internal');
        }
        const token = sign({
            userId: usertExists.id
        }, secret_key, {
            expiresIn: '1H',
        });

        return token;

    }
}