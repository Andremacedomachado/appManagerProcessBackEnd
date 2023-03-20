import { Request, Response } from "express";
import { GetRootNodeActivityTreeUseCase } from "./GetRootNodeActivityTreeUseCase";
import { GetRootNodeActivityTreeRequestSchema, GetRootNodeActivityTreeResponseDTO, GetRootNodeActivityTreeResponseSchema } from "./GetRootNodeActivityTreeDTO";
import { ZodError } from "zod";

export class GetRootNodeActivityTreeController {
    constructor(private getRootNodeActivityTreeUseCase: GetRootNodeActivityTreeUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId } = GetRootNodeActivityTreeRequestSchema.parse(request.body);
            const activityOrError = await this.getRootNodeActivityTreeUseCase.execute(activityId);
            if (activityOrError instanceof Error) {
                return response.status(400).json({ error: activityOrError.message });
            }
            const { title, description, start_date, due_date, responsible_id, progress_status, type_node, created_at, updated_at } = activityOrError.props
            const responseInFormat = GetRootNodeActivityTreeResponseSchema.parse({
                id: activityOrError.id, title, description, start_date, due_date, responsible_id, progress_status, type_node, created_at, updated_at
            } as GetRootNodeActivityTreeResponseDTO);
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });

        }
    }
}