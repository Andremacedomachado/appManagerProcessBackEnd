import { Request, Response } from "express";
import { GetActivityByIdUseCase } from "./GetActivityByIdUseCase";
import { ActivityByIdReponseType, GetActivityByIdRequestSchema, GetActivityByIdResponseSchema, IGetActivityByIdRequestDTO } from "./GetActivityDTO";
import { ZodError } from "zod";

export class GetActivityByIdController {
    constructor(private getActivityUseCase: GetActivityByIdUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId } = GetActivityByIdRequestSchema.parse(request.params);
            const activityOrError = await this.getActivityUseCase.execute({ activityId } as IGetActivityByIdRequestDTO);

            if (activityOrError instanceof Error) {
                return response.status(400).json({ error: activityOrError.message });
            }
            const { title: titleFound, responsible_id, created_at, description, due_date, progress_status, start_date, type_node, updated_at, conclusion_date } = activityOrError.props
            const responseInFormat = GetActivityByIdResponseSchema.parse({
                id: activityOrError.id,
                title: titleFound,
                description,
                responsible_id,
                start_date,
                due_date,
                progress_status,
                type_node,
                created_at,
                updated_at,
                conclusion_date
            } as ActivityByIdReponseType)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}