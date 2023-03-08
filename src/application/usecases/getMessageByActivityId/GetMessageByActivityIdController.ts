import { Request, Response } from "express";
import { GetMessageByActivityIdUseCase } from "./GetMessageByActivityIdUseCase";

export class GetMessageByActivityIdController {
    constructor(private getMessageByActivityIdUseCase: GetMessageByActivityIdUseCase) { }

    async handle(request: Request, response: Response) {
        const { activityId } = request.body;
        try {
            const collectionMessageOrError = await this.getMessageByActivityIdUseCase.execute(activityId);
            if (collectionMessageOrError instanceof Error) {
                return response.status(400).json({ error: collectionMessageOrError.message });
            }
            return response.status(200).json(collectionMessageOrError);
        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}