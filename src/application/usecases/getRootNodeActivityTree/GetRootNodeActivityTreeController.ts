import { Request, Response } from "express";
import { GetRootNodeActivityTreeUseCase } from "./GetRootNodeActivityTreeUseCase";

export class GetRootNodeActivityTreeController {
    constructor(private getRootNodeActivityTreeUseCase: GetRootNodeActivityTreeUseCase) { }

    async handle(request: Request, response: Response) {
        const { activityId } = request.body;
        try {
            const activityOrError = await this.getRootNodeActivityTreeUseCase.execute(activityId);
            if (activityOrError instanceof Error) {
                return response.status(400).json({ error: activityOrError.message });
            }
            return response.status(200).json(activityOrError);
        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });

        }
    }
}