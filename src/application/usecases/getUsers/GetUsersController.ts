import { Response, Request } from "express";
import { GetUsersUsecase } from "./GetUsersUseCase";
import { ZodError } from "zod";
import { GetUserResponseData, GetUsersResponseSchema, GetUsersSchema } from "./GetUsersDTO";
import { UserFullInfoResponseData } from "../getUserById/GetUserByIdDTO";


export class GetUsersController {
    constructor(private getUsersUseCase: GetUsersUsecase) { }
    async handle(request: Request, response: Response) {
        try {
            const query = GetUsersSchema.parse(request.query)
            const users = await this.getUsersUseCase.execute(query)
            const responseInFormat = GetUsersResponseSchema.parse(users.map(user => {
                return {
                    id: user.id,
                    ...user.props
                } as GetUserResponseData
            }))

            return response.status(200).json(responseInFormat)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}