import { Request, Response } from "express";
import { GetCollaboratorsUseCase } from "./GetCollaboratorsUseCase";
import { GetCollaboratorsSchema } from "./GetCollaboratorsDTO";
import { ZodError } from "zod";

export class GetCollaboratorsController {
    constructor(private geCollaboratorsUseCase: GetCollaboratorsUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { keys, value } = request.query
            const query = GetCollaboratorsSchema.parse({ keys: typeof keys === 'string' ? [keys] : keys, value })
            const collaborators = await this.geCollaboratorsUseCase.execute(query)
            return response.status(200).json(collaborators)

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            };
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors })
        }
    }
}