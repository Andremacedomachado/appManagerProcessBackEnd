import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";



export class GetAllUsersController {
    constructor(private getAllUserUseCase: GetAllUsersUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const UserOrError = await this.getAllUserUseCase.execute();

            if (UserOrError instanceof Error) {
                return response.status(500).json({ error: UserOrError.message });
            }
            return response.status(200).json(UserOrError);
        } catch (error) {
            return response.status(500).json({ error: "Unexpected Error" });
        }
    }
}