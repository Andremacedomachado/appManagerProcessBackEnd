import { Request, Response } from "express";
import { GetALLActivityTreeByUserUseCase } from "./GetAllActivityTreeByUserUseCase";

export class GetALLActivityTreeByUserController {
    constructor(private getALLActivityTreeByUserUseCase: GetALLActivityTreeByUserUseCase) { }

    async handle(request: Request, response: Response) {
        const { userId } = request.body;
        try {
            const collectionActivityTreeOrError = await this.getALLActivityTreeByUserUseCase.execute(userId);
            if (collectionActivityTreeOrError instanceof Error) {
                return response.status(400).json({ error: collectionActivityTreeOrError.message });
            }
            return response.status(200).json(collectionActivityTreeOrError);

        } catch (errors) {
            return response.status(500).json({ error: 'Unexpexted Error', typeErrors: errors });

        }
    }
}