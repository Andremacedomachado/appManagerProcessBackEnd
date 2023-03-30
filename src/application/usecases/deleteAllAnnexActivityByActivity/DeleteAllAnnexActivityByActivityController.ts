import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteAllAnnexActivityByActivityUseCase } from "./DeleteAllAnnexActivityByActivityUseCase";
import { DeleteAllAnnexActivityByActivityRequestSchema, DeleteAllAnnexActivityByActivtyResponseSchema } from "./DeleteAllAnnexActivityByActivityDTO";

export class DeleteAllAnnexActivityByActivityController {
    constructor(private deleteAllAnnexActivityByActivityUseCase: DeleteAllAnnexActivityByActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const filter = DeleteAllAnnexActivityByActivityRequestSchema.parse(request.body);

            const annexDeletedOrError = await this.deleteAllAnnexActivityByActivityUseCase.execute(filter);
            if (annexDeletedOrError instanceof Error) {
                return response.status(500).json({ error: annexDeletedOrError.message });
            }
            const responseInFormat = DeleteAllAnnexActivityByActivtyResponseSchema.parse(annexDeletedOrError)
            return response.status(200).json(responseInFormat)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}