import { Request, Response } from "express";
import { GetActivityUseCase } from "./GetActivityUseCase";
import { ActivityReponseType, GetActivityRequestSchema, GetActivityResponseSchema, IGetActivityRequestDTO } from "./GetActivityDTO";
import { ZodError } from "zod";

export class GetActivityController {
    constructor(private getActivityUseCase: GetActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { title } = GetActivityRequestSchema.parse(request.body);
            const activityOrError = await this.getActivityUseCase.execute({ title } as IGetActivityRequestDTO);

            if (activityOrError instanceof Error) {
                return response.status(400).json({ error: activityOrError.message });
            }
            const { title: titleFound, responsible_id, created_at, description, due_date, progress_status, start_date, type_node, updated_at } = activityOrError.props
            const responseInFormat = GetActivityResponseSchema.parse({
                id: activityOrError.id,
                title: titleFound,
                description,
                responsible_id,
                start_date,
                due_date,
                progress_status,
                type_node,
                created_at,
                updated_at
            } as ActivityReponseType)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}