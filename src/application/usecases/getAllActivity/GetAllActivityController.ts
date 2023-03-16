import { Request, Response } from "express";
import { GetAllActivityUseCase } from "./GetAllActivityUseCase";
import { ActivityResponseDTO, GetAllActivityResponseSchema } from "./GetAllActivityDTO";
import { ZodError } from "zod";

export class GetAllActivityController {
    constructor(private getAllActivityUseCase: GetAllActivityUseCase) { }
    async handle(request: Request, response: Response) {
        try {
            const activitiesOrError = await this.getAllActivityUseCase.execute();
            if (activitiesOrError instanceof Error) {
                return response.status(400).json({ error: activitiesOrError.message });
            }
            const responseInFormat = GetAllActivityResponseSchema.parse(activitiesOrError.map(activity => {
                const { title, description, responsible_id, due_date, created_at, progress_status, start_date, type_node, updated_at } = activity.props
                return {
                    id: activity.id, title, description, responsible_id, due_date, created_at, progress_status, start_date, type_node, updated_at
                } as ActivityResponseDTO;
            }))
            return response.status(200).json(responseInFormat);

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors })
        }
    }
}