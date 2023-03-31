import { Request, Response } from "express";
import { ZodError } from "zod";
import { CreateRecordDependencyUseCase } from "./CreateRecordDependencyUseCase";
import { CreateRecordDependencyRequestSchema, CreateRecordDependencyResponseSchema } from "./CreateRecordDependencyDTO";

export class CreateRecordDependencyController {
    constructor(private createRecordDependencyUseCase: CreateRecordDependencyUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const recortInsert = CreateRecordDependencyRequestSchema.parse(request.body);
            const activityOrError = await this.createRecordDependencyUseCase.execute(recortInsert);
            if (activityOrError instanceof Error) {
                return response.status(400).json({ error: activityOrError.message });
            }
            const responseInformat = CreateRecordDependencyResponseSchema.parse(activityOrError);
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}