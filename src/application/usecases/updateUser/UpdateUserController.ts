import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { UpdateUserRequestSchema, UpdateUserResponseDTO, UpdateUserResponseSchema } from "./UpdateUserDTO";
import { ZodError } from "zod";

export class UpdateUserController {
    constructor(private updateUserUseCase: UpdateUserUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const dataUpdate = UpdateUserRequestSchema.parse(request.body);
            const userUpdatedOrError = await this.updateUserUseCase.execute(dataUpdate);
            if (userUpdatedOrError instanceof Error) {
                return response.status(400).json({ error: userUpdatedOrError.message })
            }
            const { email, name, organization_sector_id, password, status, created_at, updated_at } = userUpdatedOrError.props
            const responseInFormat = UpdateUserResponseSchema.parse({ id: userUpdatedOrError.id, email, name, organization_sector_id, password, status, created_at, updated_at } as UpdateUserResponseDTO);
            return response.status(200).json(responseInFormat)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(400).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}