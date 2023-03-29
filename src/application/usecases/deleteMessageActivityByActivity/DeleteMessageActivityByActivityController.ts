import { Request, Response } from "express";
import { DeleteMessageActivityByActivityUseCase } from "./DeleteMessageActivityByActivityUseCase";
import { ZodError } from "zod";
import { DeleteMessageActivityByActivityRequestSchema, DeleteMessageActivityByActivityResponseSchema } from "./DeleteMessageActivityByActivityDTO";

export class DeleteMessageActivityByActivityController {
    constructor(private deleteMessageActivityByActivityUseCase: DeleteMessageActivityByActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId } = DeleteMessageActivityByActivityRequestSchema.parse(request.body);
            const messagesDeletedOrError = await this.deleteMessageActivityByActivityUseCase.execute(activityId);
            if (messagesDeletedOrError instanceof Error) {
                return response.status(500).json({ error: messagesDeletedOrError.message });
            }
            const responseInFormat = DeleteMessageActivityByActivityResponseSchema.parse(messagesDeletedOrError)
            response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}