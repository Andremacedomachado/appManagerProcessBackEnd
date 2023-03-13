import { Request, Response } from "express";
import { CreateActivityUseCase } from "./CreateActivityUseCase";
import { ICreateActivityRequestDTO } from "./CreateActivityDTO";

export class CreateActivityController {
    constructor(private createActivityUseCase: CreateActivityUseCase) { }

    async handle(request: Request, response: Response) {
        const { title, description, created_at, updated_at, due_date, start_date, progress_status, responsible_id } = request.body;
        try {
            const activityIdOrError = await this.createActivityUseCase.excute({ title, description, created_at, updated_at, due_date, start_date, progress_status, responsible_id } as ICreateActivityRequestDTO);

            if (activityIdOrError instanceof Error) {
                return response.status(400).json({ error: activityIdOrError.message });
            }
            return response.status(200).json(activityIdOrError);
        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected error', typeError: errors });
        }
    }

}