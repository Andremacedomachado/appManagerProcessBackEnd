import { Request, Response } from "express";
import { GetMessageByActivityIdUseCase } from "./GetMessageByActivityIdUseCase";
import { GetMessageByActivityRequestSchema, GetMessageByActivityResponseSchema } from "./GetMessageByActivityIdDTO";
import { ZodError } from "zod";

export class GetMessageByActivityIdController {
    constructor(private getMessageByActivityIdUseCase: GetMessageByActivityIdUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId } = GetMessageByActivityRequestSchema.parse(request.body);
            const collectionMessageOrError = await this.getMessageByActivityIdUseCase.execute(activityId);
            if (collectionMessageOrError instanceof Error) {
                return response.status(400).json({ error: collectionMessageOrError.message });
            }
            const responseInFormat = GetMessageByActivityResponseSchema.parse(collectionMessageOrError)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}