import { Request, Response } from "express";
import { ChangeWorkerStatusUseCase } from "./ChangeWorkerStatusUseCase";
import { IChangeWorkerStatusRequestDTO } from "./ChangeWorkerStatusDTO";

export class ChangeWorkerStatusController {
    constructor(private changeWorkerStatusUseCase: ChangeWorkerStatusUseCase) { }

    async handle(request: Request, response: Response) {
        const { userId, status } = request.body

        try {
            const userUpdatedOrError = await this.changeWorkerStatusUseCase.execute({
                id: userId,
                status,
            } as IChangeWorkerStatusRequestDTO);
            if (userUpdatedOrError instanceof Error) {
                return response.status(500).json({ error: userUpdatedOrError.message });
            }
            return response.status(200).json(userUpdatedOrError);
        } catch (error) {
            return response.status(500).json({ error: 'Unexpected Error' });
        }
    }
}