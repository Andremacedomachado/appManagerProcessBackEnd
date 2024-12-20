import { Request, Response } from "express";
import { GetAnnexsInfoByActivityIdUsecase } from "./GetAnnexsInfoByActivityIdUseCase";
import { GetAnnexsInfoByActivityIdRequestSchema, GetAnnexsInfoByActivityIdResponseSchema } from "./GetAnnexsInfoByActivityIdDTO";
import { ZodError } from "zod";


export class GetAnnexsInfoByActivityIdController {
    constructor(private getAnnexsInfoByActivityUseCase: GetAnnexsInfoByActivityIdUsecase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId } = GetAnnexsInfoByActivityIdRequestSchema.parse(request.params);

            const annexs = await this.getAnnexsInfoByActivityUseCase.execute({ activityId });
            if (!annexs) {
                throw new Error('activity not exists')
            }

            const reponseInFormat = GetAnnexsInfoByActivityIdResponseSchema.parse(annexs)

            return response.json(reponseInFormat)

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}