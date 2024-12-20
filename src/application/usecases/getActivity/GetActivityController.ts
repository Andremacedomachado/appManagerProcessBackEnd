import { Request, Response } from "express";
import { GetActivityUseCase } from "./GetActivityUseCase";
import { ActivityReponseType, GetActivitiesResponseSchema, GetActivityRequestData, GetActivityRequestSchema, GetActivityResponseSchema, IGetActivityRequestDTO } from "./GetActivityDTO";
import { ZodError } from "zod";
import { keys } from "ts-transformer-keys";
import { QueryHelp } from "../../../domain/entities/QueryHelp";
import { Activity } from "../../../domain/entities/Activity";

export class GetActivityController {
    constructor(private getActivityUseCase: GetActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { keys, values } = request.query;
            const query = GetActivityRequestSchema.parse({ keys: typeof keys === 'string' ? [keys] : keys, values } as GetActivityRequestData);
            const activityOrError = await this.getActivityUseCase.execute(query);

            if (activityOrError instanceof Error) {
                return response.status(400).json({ error: activityOrError.message });
            }
            const responseInFormat = GetActivitiesResponseSchema.parse(activityOrError.map(({ id, props }) => ({
                id, ...props
            } as ActivityReponseType)))
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}