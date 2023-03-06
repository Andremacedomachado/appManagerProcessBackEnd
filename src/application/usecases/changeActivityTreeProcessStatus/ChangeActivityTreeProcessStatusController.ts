import { Request, Response } from "express";
import { ChangeActivityTreeProcessStatusUseCase } from "./ChangeActivityTreeProcessStatusUseCase";

export class ChangeActivityTreeProcessStatusController {
    constructor(private changeActivityTreeProcessStatusUseCase: ChangeActivityTreeProcessStatusUseCase) { }

    async handle(request: Request, response: Response) {
        const { activityId } = request.body;
        try {
            const resultOperationOrError = await this.changeActivityTreeProcessStatusUseCase.execute(activityId);
            if (resultOperationOrError instanceof Error) {
                return response.status(400).json({ error: resultOperationOrError.message });
            }
            return response.status(200).json();

        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });

        }
    }
}