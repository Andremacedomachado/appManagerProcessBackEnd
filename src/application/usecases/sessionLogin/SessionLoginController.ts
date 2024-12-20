import { Request, Response } from 'express';

import { SessionLoginUseCase } from './SessionLoginUseCase';
import { ISessionLoginRequestDTO, SessionLogingRequestSchema, SessionLogingResponseDTO, SessionLogingResponseSchema } from './SessionLoginDTO';

export class SessionLoginController {

    constructor(
        private sessionLoginUseCase: SessionLoginUseCase
    ) { }

    async handle(request: Request, response: Response) {
        try {
            const { email, password } = SessionLogingRequestSchema.parse(request.body);
            const tokenOrError = await this.sessionLoginUseCase.excute({ email, password } as ISessionLoginRequestDTO);
            if (tokenOrError instanceof Error) {
                return response.status(400).json({ error: tokenOrError.message });
            }
            //const responseInFormat = SessionLogingResponseSchema.parse({ ...tokenOrError } as SessionLogingResponseDTO)
            return response.status(200).json(tokenOrError);
        } catch (err) {
            return response.status(400).json({ message: 'Unexpected error', error: err });
        }
    }
}