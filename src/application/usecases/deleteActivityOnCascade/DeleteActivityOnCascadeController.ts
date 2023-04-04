import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteActivityOnCascadeUseCase } from "./DeleteActivityOnCascadeUseCase";
import { DeleteActivityOnCascadeRequestSchema, DeleteActivityOnCascadeResponseDTO, DeleteActivityOnCascadeResponseSchema } from "./DeleteActivityOnCascadeDTO";

export class DeleteActivityOnCascadeController {
    constructor(private deleteActivityOnCascadeUseCase: DeleteActivityOnCascadeUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId } = DeleteActivityOnCascadeRequestSchema.parse(request.body);
            const activityDeletedOrError = await this.deleteActivityOnCascadeUseCase.execute(activityId);
            if (activityDeletedOrError instanceof Error) {
                return response.status(500).json({ error: activityDeletedOrError.message })
            }
            const responseInformat = DeleteActivityOnCascadeResponseSchema.parse({
                infoActivity: {
                    ...activityDeletedOrError.infoActivity.props,
                    id: activityDeletedOrError.infoActivity.id
                },
                dependencies: activityDeletedOrError.dependencies,
                collaborators: activityDeletedOrError.collaborators,
                annexsInActivity: activityDeletedOrError.annexsInActivity,
                messagesInActivity: activityDeletedOrError.messagesInActivity
            } as DeleteActivityOnCascadeResponseDTO);
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}