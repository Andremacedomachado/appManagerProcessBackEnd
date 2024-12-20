import { Request, Response } from "express";
import { DeleteProjectRequestSchema, DeleteProjectResponseSchema } from "./DeleteProjectDTO";
import { DeleteProjectUseCase } from "./DeleteProjectUseCase";
import { ZodError } from "zod";

export class DeleteProjectContoler {
    constructor(private deleteProjectUseCase: DeleteProjectUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const dataPayload = DeleteProjectRequestSchema.parse(request.query)
            const projectDeleted = await this.deleteProjectUseCase.execute(dataPayload)
            const responseInFormat = DeleteProjectResponseSchema.parse({ id: projectDeleted.id, ...projectDeleted.props })
            return response.json(responseInFormat).status(200)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}