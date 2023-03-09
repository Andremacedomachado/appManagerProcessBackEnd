import { Request, Response } from "express";
import { GetAnnexFileUseCase } from "./GetAnnexFileUseCase";
import { IGetAnnexFileRequestDTO } from "./GetAnnexFileDTO";
import fs from "fs";

export class GetAnnexFileController {
    constructor(private getAnnexFileUseCase: GetAnnexFileUseCase) { }

    async handle(request: Request, response: Response) {
        const { original_name, publication_date } = request.body;
        try {
            const annexPathFileOrError = await this.getAnnexFileUseCase.execute({ original_name, publication_date } as IGetAnnexFileRequestDTO);

            if (annexPathFileOrError instanceof Error) {
                return response.status(400).json({ error: annexPathFileOrError.message });
            }
            return response.download(annexPathFileOrError.path, annexPathFileOrError.name);
        } catch (errors) {
            return response.status(500).json({ error: 'Unexpcted Error', typeErrors: errors });
        }
    }
}