import { ZodError } from "zod";
import { Request, Response } from "express"
import { GetActivityAdjacentUseCase } from "./GetActvivityAdjacentUseCase";
import { GetActivityAdjacentRequestSchema, GetActivityAdjacentResponseSchema } from "./GetActivityAdjacentDTO";


export class GetActivityAdjacentController {
    constructor(private getActivityAdjacentUseCase: GetActivityAdjacentUseCase) { }

    async handler(request: Request, response: Response) {
        try {
            const { activityId } = GetActivityAdjacentRequestSchema.parse(request.query)
            const recordsAdjacents = await this.getActivityAdjacentUseCase.execute(activityId)
            const responseInFormat = GetActivityAdjacentResponseSchema.parse(recordsAdjacents);
            return response.status(200).json(responseInFormat);

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}