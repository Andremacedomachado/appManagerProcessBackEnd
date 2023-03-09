import { Request, Response } from "express";
import { GetAnnexActivityInfoUseCase } from "./GetAnnexActivityInfoUseCase";
import { IGetAnnexActivityInfoRequestDTO } from "./GetAnnexActivityInfoDTO";

export class GetAnnexActivityInfoController {
    constructor(private getAnnexActivityInfoUseCase: GetAnnexActivityInfoUseCase) { }

    async handle(request: Request, response: Response) {
        const { original_name, publication_date } = request.body
        try {
            const annexActivityInfoOrError = await this.getAnnexActivityInfoUseCase.execute({ original_name, publication_date } as IGetAnnexActivityInfoRequestDTO);
            if (annexActivityInfoOrError instanceof Error) {
                return response.status(400).json({ error: annexActivityInfoOrError.message });
            }
            return response.status(200).json(annexActivityInfoOrError);
        } catch (errors) {
            return response.status(400).json({ error: 'Unexpcted Error', typeErrors: errors });
        }
    }
}