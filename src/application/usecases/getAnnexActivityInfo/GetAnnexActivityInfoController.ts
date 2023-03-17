import { Request, Response } from "express";
import { GetAnnexActivityInfoUseCase } from "./GetAnnexActivityInfoUseCase";
import { GetAnnexActivityInfoRequestSchema, GetAnnexActivityInfoResponseSchema, IGetAnnexActivityInfoRequestDTO } from "./GetAnnexActivityInfoDTO";
import { ZodError } from "zod";

export class GetAnnexActivityInfoController {
    constructor(private getAnnexActivityInfoUseCase: GetAnnexActivityInfoUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { original_name, publication_date } = GetAnnexActivityInfoRequestSchema.parse(request.body)
            const annexActivityInfoOrError = await this.getAnnexActivityInfoUseCase.execute({ original_name, publication_date } as IGetAnnexActivityInfoRequestDTO);
            if (annexActivityInfoOrError instanceof Error) {
                return response.status(400).json({ error: annexActivityInfoOrError.message });
            }
            const responseInFormat = GetAnnexActivityInfoResponseSchema.parse(annexActivityInfoOrError)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(400).json(errors.issues);
            }
            return response.status(400).json({ error: 'Unexpcted Error', typeErrors: errors });
        }
    }
}