import { Request, Response } from "express";
import { GetAllMessageActivityUseCase } from "./GetAllMessageActivityUseCase";
import { GetAllMessageResponseSchema } from "./GetAllMessageActivityDTO";
import { ZodError } from "zod";

export class GetAllMessageActivityController {
    constructor(private getAllMessageActivityUseCase: GetAllMessageActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const collectionMessageOrError = await this.getAllMessageActivityUseCase.execute();
            if (collectionMessageOrError instanceof Error) {
                return response.status(400).json({ error: collectionMessageOrError.message });
            }
            const responseInFormat = GetAllMessageResponseSchema.parse(collectionMessageOrError);
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}