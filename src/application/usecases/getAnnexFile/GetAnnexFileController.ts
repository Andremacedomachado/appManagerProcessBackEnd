import { Request, Response } from "express";
import { GetAnnexFileUseCase } from "./GetAnnexFileUseCase";
import { GetAnnexFileDataRequestSchema, GetAnnexFileDataResponseSchema, IGetAnnexFileRequestDTO } from "./GetAnnexFileDTO";
import { ZodError } from "zod";

export class GetAnnexFileController {
    constructor(private getAnnexFileUseCase: GetAnnexFileUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { original_name, publication_date } = GetAnnexFileDataRequestSchema.parse(request.body);
            const annexPathFileOrError = await this.getAnnexFileUseCase.execute({ original_name, publication_date } as IGetAnnexFileRequestDTO);

            if (annexPathFileOrError instanceof Error) {
                return response.status(400).json({ error: annexPathFileOrError.message });
            }
            const { path, name } = GetAnnexFileDataResponseSchema.parse(annexPathFileOrError)
            return response.download(path, name);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpcted Error', typeErrors: errors });
        }
    }
}