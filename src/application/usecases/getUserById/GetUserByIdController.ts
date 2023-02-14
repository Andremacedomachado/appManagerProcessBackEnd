import { Request, Response } from "express";

import { GetUserByIdUseCase } from "./GetUserByIdUseCase";


export class GetUserByIdController {
    constructor(private getUserByIdUseCase: GetUserByIdUseCase) { }

    async handle(request: Request, response: Response) {
        const { userId } = request.body

        try {
            const UserOrError = await this.getUserByIdUseCase.excute(userId);

            if (UserOrError instanceof Error) {
                return response.status(500).json({ error: UserOrError.message });
            }
            return response.status(200).json(UserOrError);
        } catch (error) {
            return response.status(500).json({ error: "Unexpected Error" });
        }
    }
}