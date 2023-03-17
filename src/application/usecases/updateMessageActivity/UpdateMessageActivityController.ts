import { Request, Response } from "express";
import { UpdateMessageActivityUseCase } from "./UpdateMessageActivityUseCase";
import { IUpdateMessageActivityRequestDTO, UpdateMessageActivityRequestSchema, UpdateMessageActivityResponseSchema } from "./UpdateMessageActivityDTO";
import { ZodError } from "zod";

export class UpdateMessageActivityController {
    constructor(private updateMessageActivityUseCase: UpdateMessageActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { content, type_message, updated_at, activity_id, publication_date, user_id } = UpdateMessageActivityRequestSchema.parse(request.body);
            const messageUpdatedOrError = await this.updateMessageActivityUseCase.execute({ content, type_message, updated_at, activity_id, publication_date, user_id } as IUpdateMessageActivityRequestDTO);
            if (messageUpdatedOrError instanceof Error) {
                return response.status(400).json({ error: messageUpdatedOrError.message });
            }
            const responseInFormat = UpdateMessageActivityResponseSchema.parse(messageUpdatedOrError);
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}