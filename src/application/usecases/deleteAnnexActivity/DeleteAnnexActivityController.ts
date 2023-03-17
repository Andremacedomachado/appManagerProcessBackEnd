import { Request, Response } from "express";
import { DeleteAnnexActivtyUseCase } from "./DeleteAnnexActivityUseCase";
import { DeletAnnexActivityRequestSchema } from "./DeleteAnnexActivityDTO";
import { ZodError } from "zod";

export class DeleteAnnexActivityController {
    constructor(private deleteAnnexActivityUseCase: DeleteAnnexActivtyUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activity_id, publication_date, user_id } = DeletAnnexActivityRequestSchema.parse(request.body);
            const resultDeleteOrError = await this.deleteAnnexActivityUseCase.execute({ activity_id, publication_date, user_id });
            if (resultDeleteOrError instanceof Error) {
                return response.status(400).json({ error: resultDeleteOrError.message });
            }
            return response.status(200).json({ message: 'operation successful' });
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}