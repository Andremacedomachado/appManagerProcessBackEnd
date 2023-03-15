import { Request, Response } from "express";
import { ChangeWorkerStatusUseCase } from "./ChangeWorkerStatusUseCase";
import { ChangeStatusRequestSchema, IChangeWorkerStatusRequestDTO } from "./ChangeWorkerStatusDTO";
import { UserInfoResponseSchema, UserInfoResponseType } from "../getAllUsers/GetAllUsersDTO";
import { ZodError } from "zod";

export class ChangeWorkerStatusController {
    constructor(private changeWorkerStatusUseCase: ChangeWorkerStatusUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { userId, status } = ChangeStatusRequestSchema.parse(request.body);
            const userUpdatedOrError = await this.changeWorkerStatusUseCase.execute({
                id: userId,
                status,
            } as IChangeWorkerStatusRequestDTO);
            if (userUpdatedOrError instanceof Error) {
                return response.status(500).json({ error: userUpdatedOrError.message });
            }
            const { name, email, organization_sector_id, status: statusResponse, created_at, updated_at } = userUpdatedOrError.props
            const reponseInFormat = UserInfoResponseSchema.parse({
                id: userUpdatedOrError.id,
                name,
                email,
                created_at,
                updated_at,
                organization_sector_id,
                status: statusResponse
            } as UserInfoResponseType)
            return response.status(200).json(reponseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}