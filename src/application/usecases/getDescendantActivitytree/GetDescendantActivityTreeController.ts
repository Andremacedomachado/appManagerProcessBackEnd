import { Request, Response } from "express";
import { GetDescendantActivityTreeUsecase } from "./GetDescendantActivityTreeUseCase";
import { GetDescendantActivityResponseDTO, GetDescendantActivityTreeRequestSchema, GetDescendantActivityTreeResponseSchema } from "./GetDescendantActivityTreeDTO";
import { ZodError } from "zod";

export class GetDescendatActivityTreeController {
    constructor(private getDescendantActivityTreeUseCase: GetDescendantActivityTreeUsecase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId } = GetDescendantActivityTreeRequestSchema.parse(request.body);
            const activityTreerError = await this.getDescendantActivityTreeUseCase.execute(activityId);
            if (activityTreerError instanceof Error) {
                return response.status(400).json({ error: activityTreerError.message });
            }

            const responseInFormat = GetDescendantActivityTreeResponseSchema.parse(activityTreerError.map(activity => {
                const { responsible_id, title, created_at, description, due_date, progress_status, start_date, type_node, updated_at } = activity.props
                return {
                    id: activity.id, responsible_id, title, created_at, description, due_date, progress_status, start_date, type_node, updated_at
                } as GetDescendantActivityResponseDTO
            }))
            return response.status(200).json(responseInFormat);

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(400).json({ error: "Unexpected Error", typeError: errors });

        }
    }
}