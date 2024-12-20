import { Request, Response } from "express";
import { ZodError } from "zod";
import { GetMessageActivitySchema } from "./GetMessageActivityDTO";
import { GetMessageActivityUseCase } from "./GetMessageActivityUseCase"

export class GetMessageActivityController {
    constructor(private getMessageActivityUseCase: GetMessageActivityUseCase) { }

    async handle(request: Request, response: Response) {

        try {
            const { keys, value } = request.query
            const query = GetMessageActivitySchema.parse({ keys: typeof keys == 'string' ? [keys] : keys, value })
            const messages = await this.getMessageActivityUseCase.execute(query)
            return response.status(200).json(messages)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }

            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors })
        }

    }
}