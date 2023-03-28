import { Request, Response } from "express";
import { DeleteMessageActivityUseCase } from "./DeleteMessageActivityUseCase";
import { ZodError } from "zod";
import { DeleteMessageActivityRequestSchema, DeleteMessageActivityResponseSchema } from "./DeleteMessageActivityDTO";

export class DeleteMessageActivityController {
    constructor(private deleteMessageActivity: DeleteMessageActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const messageId = DeleteMessageActivityRequestSchema.parse(request.body);
            const messageOrError = await this.deleteMessageActivity.execute(messageId);
            if (messageOrError instanceof Error) {
                return response.status(400).json({ error: messageOrError.message });
            }
            const responseInFormat = DeleteMessageActivityResponseSchema.parse(messageOrError);
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}