import { Request, Response } from "express";
import { GetProjectUseCase } from "./GetProjectUseCase";
import { GetProjectRequestSchema, GetProjectResponseSchema } from "./GetProjectDTO";
import { ZodError } from "zod";

export class GetProjectController {

    constructor(private getProjectUseCase: GetProjectUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const dataPayload = GetProjectRequestSchema.parse(request.query)
            const projectsFound = await this.getProjectUseCase.excute(dataPayload)
            if (!projectsFound) {
                return response.json([]).status(200)
            }
            const responseInFormat = GetProjectResponseSchema.parse(projectsFound.map(({ id, props }) => {
                return { id, ...props }
            }))
            return response.json(responseInFormat).status(200)
        } catch (errors) {
            console.error(errors)
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });

        }
    }

}