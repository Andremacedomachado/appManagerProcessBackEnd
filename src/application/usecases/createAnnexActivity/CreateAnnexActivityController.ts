import { Request, Response } from "express";
import { CreateAnnexActivityUseCase } from "./CreateAnnexActivityUseCase";
import { CreateAnnexActivityRequestDTO, CreateAnnexActivityRequestSchema, CreateAnnexActivityResponseSchema, ICreateAnnexActivityRequestDTO } from "./CreateAnnexActivityDTO";
import { ZodError } from "zod";
export class CreateAnnexActivityController {
    constructor(private createAnnexActivityUseCase: CreateAnnexActivityUseCase) { }

    async handle(request: Request, response: Response) {

        try {
            if (!request.file) {
                return response.status(400).json({ error: 'missing file in payload!' })
            }
            const { originalname: original_name, filename: file_name } = request.file
            const { activity_id, user_id, publication_date, url } = request.body;
            const dataRequestValid = CreateAnnexActivityRequestSchema.parse({
                activity_id,
                user_id,
                file_name,
                original_name,
                publication_date,
                url
            } as CreateAnnexActivityRequestDTO)
            const annexActivityIdOrError = await this.createAnnexActivityUseCase.execute(dataRequestValid)
            if (annexActivityIdOrError instanceof Error) {
                return response.status(400).json({ error: annexActivityIdOrError.message });
            }
            const responseInFormat = CreateAnnexActivityResponseSchema.parse(annexActivityIdOrError)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}