import { Request, Response } from "express";
import { GetALLActivityTreeByUserUseCase } from "./GetAllActivityTreeByUserUseCase";
import { ActivityTreeByUserResponseDTO, GetALlActivityTreeByUserResponseDTO, GetALlActivityTreeByUserResponseSchema, GetAllActivityTreeByUserRequestSchema } from "./GetAllActivityTreeByUserDTO";
import { ZodError } from "zod";

export class GetALLActivityTreeByUserController {
    constructor(private getALLActivityTreeByUserUseCase: GetALLActivityTreeByUserUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { userId } = GetAllActivityTreeByUserRequestSchema.parse(request.body);
            const collectionActivityTreeOrError = await this.getALLActivityTreeByUserUseCase.execute(userId);
            if (collectionActivityTreeOrError instanceof Error) {
                return response.status(400).json({ error: collectionActivityTreeOrError.message });
            }
            const reponseInFormat = GetALlActivityTreeByUserResponseSchema.parse({
                collectionsActivityTree: collectionActivityTreeOrError.collectionsActivityTree.map(activitytree => {
                    return {
                        activities:
                            activitytree.activities.map(activity => {
                                const { responsible_id, title, created_at, description, due_date, progress_status, start_date, type_node, updated_at } = activity.props;
                                return {
                                    id: activity.id, responsible_id, title, created_at, description, due_date, progress_status, start_date, type_node, updated_at
                                }
                            }),
                        collaborators:
                            activitytree.collaborators
                    }
                })
            } as GetALlActivityTreeByUserResponseDTO);
            return response.status(200).json(reponseInFormat);

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpexted Error', typeErrors: errors });

        }
    }
}