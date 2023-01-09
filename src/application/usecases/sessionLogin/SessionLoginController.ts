import { Request, Response } from 'express';

import { SessionLoginUseCase } from './SessionLoginUseCase';
import { ISessionLoginRequestDTO } from './SessionLoginDTO';

export class SessionLoginController {

    constructor(
        private sessionLoginUseCase: SessionLoginUseCase
    ) { }

    async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        try {
            const tokenOrError = await this.sessionLoginUseCase.excute({ email, password } as ISessionLoginRequestDTO);
            if (tokenOrError instanceof Error) {
                return response.status(400).json({ error: tokenOrError.message });
            }
            return response.status(200).json({ token: tokenOrError });
        } catch (err) {
            return response.status(400).json({ message: 'Unexpected error' });
        }
    }
}