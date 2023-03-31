
import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteRecordDependencyUseCase } from "./DeleteRecordDependencyUseCase";
import { DeleteRecordDependencyRequestSchema, DeleteRecordDependencyResponseSchema } from "./DeleteRecordDependencyDTO";

export class DeleteRecordDependencyController {
    constructor(private DeleteRecordDependencyUseCase: DeleteRecordDependencyUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const recordId = DeleteRecordDependencyRequestSchema.parse(request.body);
            const recordDeletedOrError = await this.DeleteRecordDependencyUseCase.execute(recordId);
            if (recordDeletedOrError instanceof Error) {
                return response.status(400).json({ error: recordDeletedOrError.message })
            }
            const responseInformat = DeleteRecordDependencyResponseSchema.parse(recordDeletedOrError);
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}