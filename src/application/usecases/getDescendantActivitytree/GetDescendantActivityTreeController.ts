import { Request, Response } from "express";
import { GetDescendantActivityTreeUsecase } from "./GetDescendantActivityTreeUseCase";

export class GetDescendatActivityTreeController {
    constructor(private getDescendantActivityTreeUseCase: GetDescendantActivityTreeUsecase) { }

    async handle(request: Request, response: Response) {
        const { activityId } = request.body;
        try {
            const activityTreerError = await this.getDescendantActivityTreeUseCase.execute(activityId);
            if (activityTreerError instanceof Error) {
                return response.status(400).json({ error: activityTreerError.message });
            }
            return response.status(200).json(activityTreerError);

        } catch (errors) {
            return response.status(400).json({ error: "Unexpected Error", typeError: errors });

        }
    }
}