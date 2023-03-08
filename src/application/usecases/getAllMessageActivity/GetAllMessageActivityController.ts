import { Request, Response } from "express";
import { GetAllMessageActivityUseCase } from "./GetAllMessageActivityUseCase";

export class GetAllMessageActivityController {
    constructor(private getAllMessageActivityUseCase: GetAllMessageActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const collectionMessageOrError = await this.getAllMessageActivityUseCase.execute();
            if (collectionMessageOrError instanceof Error) {
                return response.status(400).json({ error: collectionMessageOrError.message });
            }
            return response.status(200).json(collectionMessageOrError);
        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}