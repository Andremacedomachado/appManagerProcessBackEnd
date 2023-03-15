import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";
import { TUserInfoResponseWithoutPassword, allUserReponseSchema } from "./GetAllUsersDTO";
import { z } from "zod";



export class GetAllUsersController {
    constructor(private getAllUserUseCase: GetAllUsersUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const UserOrError = await this.getAllUserUseCase.execute();

            if (UserOrError instanceof Error) {
                return response.status(500).json({ error: 'Database void' });
            }
            const reponseInFormat = allUserReponseSchema.parse(UserOrError.map(user => {
                const { email, name, organization_sector_id, status, created_at, updated_at } = user.props
                return {
                    id: user.id,
                    name,
                    email,
                    status,
                    created_at,
                    updated_at,
                    organization_sector_id,
                } as TUserInfoResponseWithoutPassword;
            }));
            return response.status(200).json(reponseInFormat);
        } catch (errors) {

            if (errors instanceof z.ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: "Unexpected Error" });
        }
    }
}