import { Request, Response } from "express";
import { GetAllActivityUseCase } from "./GetAllActivityUseCase";

export class GetAllActivityController {
    constructor(private getAllActivityUseCase: GetAllActivityUseCase) { }
    async handle(request: Request, response: Response) {
        try {
            const activitiesOrError = await this.getAllActivityUseCase.execute();
            if (activitiesOrError instanceof Error) {
                return response.status(400).json({ error: activitiesOrError.message });
            }
            return response.status(200).json(activitiesOrError);

        } catch (error) {
            return response.status(500).json({ error: 'Unexpected Error' })
        }
    }
}