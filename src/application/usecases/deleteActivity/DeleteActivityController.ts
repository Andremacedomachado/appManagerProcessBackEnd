import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteActivityUseCase } from "./DeleteActivityUseCase";
import { DeleteActivityRequestSchema, DeleteActivityResponseDTO, DeleteActivityResponseSchema } from "./DeleteActivityDTO";

export class DeleteActivityController {
    constructor(private deleteActivityUseCase: DeleteActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId } = DeleteActivityRequestSchema.parse(request.body);
            const activityDeletedOrError = await this.deleteActivityUseCase.execute(activityId);
            if (activityDeletedOrError instanceof Error) {
                return response.status(400).json({ error: activityDeletedOrError.message });
            }
            const responseInformat = DeleteActivityResponseSchema.parse({ ...activityDeletedOrError.props, id: activityDeletedOrError.id } as DeleteActivityResponseDTO);
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}