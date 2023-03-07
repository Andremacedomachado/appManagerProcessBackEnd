import { Request, Response } from "express";
import { CreateMessageActivityUseCase } from "./CreateMessageActivityUseCase";
import { ICreateMessageActivityRequestDTO } from "./CreateMessageActivtyDTO";

export class CreateMessageActivityController {
    constructor(private createMessageActivityUseCase: CreateMessageActivityUseCase) { }

    async handle(request: Request, response: Response) {
        const { content, publication_date, updated_at, typeMessage, activityId, userId } = request.body;

        try {
            const messageIdOrError = await this.createMessageActivityUseCase.execute({ content, publication_date, updated_at, typeMessage, activityId, userId } as ICreateMessageActivityRequestDTO);
            if (messageIdOrError instanceof Error) {
                return response.status(400).json({ error: messageIdOrError.message });
            }
            return response.status(200).json(messageIdOrError);
        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}