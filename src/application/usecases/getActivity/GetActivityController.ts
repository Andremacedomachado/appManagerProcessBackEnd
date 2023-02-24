import { Request, Response } from "express";
import { GetActivityUseCase } from "./GetActivityUseCase";
import { IGetActivityRequestDTO } from "./GetActivityDTO";

export class GetActivityController {
    constructor(private getActivityUseCase: GetActivityUseCase) { }

    async handle(request: Request, response: Response) {
        const { title } = request.body
        try {
            const activityOrError = await this.getActivityUseCase.execute({ title } as IGetActivityRequestDTO);

            if (activityOrError instanceof Error) {
                return response.status(400).json({ error: activityOrError.message });
            }
            return response.status(200).json(activityOrError);
        } catch (error) {
            return response.status(500).json({ error: 'Unexpected Error' });
        }
    }
}