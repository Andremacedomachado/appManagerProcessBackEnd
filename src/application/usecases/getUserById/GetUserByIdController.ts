import { Request, Response } from "express";
import { ZodError } from "zod";

import { GetUserByIdUseCase } from "./GetUserByIdUseCase";
import { UserFullInfoResponseSchema, UserIdRequestSchema } from "./GetUserByIdDTO";


export class GetUserByIdController {
    constructor(private getUserByIdUseCase: GetUserByIdUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { userId } = UserIdRequestSchema.parse(request.params)
            const UserOrError = await this.getUserByIdUseCase.excute(userId);

            if (UserOrError instanceof Error) {
                console.log('Erro :', UserOrError.name)
                return response.status(500).json({ error: UserOrError.message });
            }
            //
            const responseInFormat = UserFullInfoResponseSchema.parse(UserOrError)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            console.log('Erro controller backend :', errors)
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: "Unexpected Error" });
        }
    }
}