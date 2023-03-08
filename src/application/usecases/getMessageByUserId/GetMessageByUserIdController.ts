import { Request, Response } from "express";
import { GetMessageByUserIdUseCase } from "./GetMessageByUserIdUseCase";

export class GetMessageByUserIdController {
    constructor(private getMessageByUserIdUseCase: GetMessageByUserIdUseCase) { }

    async handle(request: Request, response: Response) {
        const { userId } = request.body;
        try {
            const collectionMessageOrError = await this.getMessageByUserIdUseCase.execute(userId);
            if (collectionMessageOrError instanceof Error) {
                return response.status(400).json({ error: collectionMessageOrError.message });
            }
            return response.status(200).json(collectionMessageOrError);
        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}