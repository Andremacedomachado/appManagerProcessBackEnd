import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteRecordDependencyByCorrelationUseCase } from "./DeleteRecordDependencyByCorrelationUseCase";
import { DeleteRecordDependencyByCorrelationRequestSchema, DeleteRecordDependencyByCorrelationResponseSchema, RecordDependencyByCorrelationResponseSchema } from "./DeleteRecordDependencyByCorrelationDTO";

export class DeleteRecordDependencyByCorrelationController {
    constructor(private deleteRecordDependencyByCorrelationUseCase: DeleteRecordDependencyByCorrelationUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId } = DeleteRecordDependencyByCorrelationRequestSchema.parse(request.body);
            const collectionRelationDeletedOrError = await this.deleteRecordDependencyByCorrelationUseCase.execute(activityId);
            if (collectionRelationDeletedOrError instanceof Error) {
                return response.status(500).json({ error: collectionRelationDeletedOrError.message });
            }
            const responseInformat = DeleteRecordDependencyByCorrelationResponseSchema.parse(collectionRelationDeletedOrError);
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}