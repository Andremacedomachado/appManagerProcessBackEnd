import { Request, Response } from "express";
import { CreateActivityUseCase } from "./CreateActivityUseCase";
import { CreateActivityRequestSchema, CreateActivityResponseSchema, ICreateActivityRequestDTO } from "./CreateActivityDTO";
import { ZodError } from "zod";

export class CreateActivityController {
    constructor(private createActivityUseCase: CreateActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { title, description, created_at, updated_at, due_date, start_date, progress_status, responsible_id, type_node } = CreateActivityRequestSchema.parse(request.body);
            const activityIdOrError = await this.createActivityUseCase.excute({ title, description, created_at, updated_at, due_date, start_date, progress_status, responsible_id, type_node } as ICreateActivityRequestDTO);

            if (activityIdOrError instanceof Error) {
                return response.status(400).json({ error: activityIdOrError.message });
            }
            const responseInFormat = CreateActivityResponseSchema.parse(activityIdOrError)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected error', typeError: errors });
        }
    }

}