import { Request, Response } from "express";
import { CreateProjectRequestSchema, CreateProjectResponseSchema } from "./CreateProjectDTO";
import { CreateProjectUseCase } from "./CreateProjectUsecase";
import { ZodError } from "zod";


export class CreateProjectController {
    constructor(private createProjectUseCase: CreateProjectUseCase) { }
    async handle(request: Request, response: Response) {
        try {
            const dataPayload = CreateProjectRequestSchema.parse(request.body);
            const projectCreated = await this.createProjectUseCase.execute(dataPayload)
            const responseInFormat = CreateProjectResponseSchema.parse({ id: projectCreated.id, ...projectCreated.props })
            return response.json(responseInFormat).status(201)
        } catch (errors) {
            if (errors instanceof ZodError) {

            }
            if (errors instanceof Error) {

            }
            return response.json({
                error: 'Unexpects Error',
                typeError: errors
            })
        }
    }
}