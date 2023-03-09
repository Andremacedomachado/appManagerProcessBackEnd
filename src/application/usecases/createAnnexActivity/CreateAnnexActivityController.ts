import { Request, Response } from "express";
import { CreateAnnexActivityUseCase } from "./CreateAnnexActivityUseCase";
import { ICreateAnnexActivityRequestDTO } from "./CreateAnnexActivityDTO";


export class CreateAnnexActivityController {
    constructor(private createAnnexActivityUseCase: CreateAnnexActivityUseCase) { }

    async handle(request: Request, response: Response) {
        const { activity_id, user_id } = request.body;
        if (!request.file) {
            return response.status(400).json({ error: 'missing file in payload!' })
        }
        const { originalname: original_name, filename: file_name } = request.file

        try {
            const annexActivityIdOrError = await this.createAnnexActivityUseCase.execute({
                file_name,
                activity_id,
                original_name,
                url: '',
                user_id
            } as ICreateAnnexActivityRequestDTO)

            if (annexActivityIdOrError instanceof Error) {
                return response.status(400).json({ error: annexActivityIdOrError.message });
            }
            return response.status(200).json(annexActivityIdOrError);
        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}