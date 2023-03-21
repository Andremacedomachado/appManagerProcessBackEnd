import { Request, Response } from "express";
import { ChangeSectorUserUseCase } from "./ChangeSectorUserUseCase";
import { ChangeSectorUserRequestSchema, ChangeSectorUserResponseDTO, ChangeSectorUserResponseSchema } from "./ChangeSectorUserDTO";
import { ZodError } from "zod";

export class ChangeSectorUserController {
    constructor(private changeSectorUserUseCase: ChangeSectorUserUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const dataChangeRequest = ChangeSectorUserRequestSchema.parse(request.body);
            const userUpdatedOrError = await this.changeSectorUserUseCase.execute(dataChangeRequest);
            if (userUpdatedOrError instanceof Error) {
                return response.status(400).json({ error: userUpdatedOrError.message });
            }
            const { email, name, organization_sector_id, status, created_at, updated_at } = userUpdatedOrError.props
            const responseInFormat = ChangeSectorUserResponseSchema.parse({ id: userUpdatedOrError.id, email, name, organization_sector_id, status, created_at, updated_at } as ChangeSectorUserResponseDTO);
            return response.status(200).json(responseInFormat)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(400).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected error', typeError: errors });
        }
    }
}