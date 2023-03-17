import { Request, Response } from "express";
import { CreateMessageActivityUseCase } from "./CreateMessageActivityUseCase";
import { CreateMessageActivityRequestSchema, CreateMessageActivityResponseSchema, ICreateMessageActivityRequestDTO } from "./CreateMessageActivtyDTO";
import { ZodError } from "zod";

export class CreateMessageActivityController {
    constructor(private createMessageActivityUseCase: CreateMessageActivityUseCase) { }

    async handle(request: Request, response: Response) {

        try {
            const { content, publication_date, updated_at, typeMessage, activityId, userId } = CreateMessageActivityRequestSchema.parse(request.body);
            const messageIdOrError = await this.createMessageActivityUseCase.execute({ content, publication_date, updated_at, typeMessage, activityId, userId } as ICreateMessageActivityRequestDTO);
            if (messageIdOrError instanceof Error) {
                return response.status(400).json({ error: messageIdOrError.message });
            }
            const responseInFormat = CreateMessageActivityResponseSchema.parse(messageIdOrError);
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}