import { Request, Response } from "express";
import { DeleteAnnexActivtyUseCase } from "./DeleteAnnexActivityUseCase";

export class DeleteAnnexActivityController {
    constructor(private deleteAnnexActivityUseCase: DeleteAnnexActivtyUseCase) { }

    async handle(request: Request, response: Response) {
        const { activity_id, publication_date, user_id } = request.body;
        try {
            const resultDeleteOrError = await this.deleteAnnexActivityUseCase.execute({ activity_id, publication_date, user_id });
            if (resultDeleteOrError instanceof Error) {
                return response.status(400).json({ error: resultDeleteOrError.message });
            }
            return response.status(200).json({ message: 'operation successful' });
        } catch (errors) {
            return response.status(400).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}