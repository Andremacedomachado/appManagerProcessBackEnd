import { Request, Response } from "express";
import { UpdateMessageActivityUseCase } from "./UpdateMessageActivityUseCase";
import { IUpdateMessageActivityRequestDTO } from "./UpdateMessageActivityDTO";

export class UpdateMessageActivityController {
    constructor(private updateMessageActivityUseCase: UpdateMessageActivityUseCase) { }

    async handle(request: Request, response: Response) {
        const { content, type_message, updated_at, activity_id, publication_date, user_id } = request.body;
        try {
            const messageUpdatedOrError = await this.updateMessageActivityUseCase.execute({ content, type_message, updated_at, activity_id, publication_date, user_id } as IUpdateMessageActivityRequestDTO);
            if (messageUpdatedOrError instanceof Error) {
                return response.status(400).json({ error: messageUpdatedOrError.message });
            }
            return response.status(200).json(messageUpdatedOrError);
        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}