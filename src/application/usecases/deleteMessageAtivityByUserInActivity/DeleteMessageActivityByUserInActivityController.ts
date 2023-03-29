import { Request, Response } from "express";
import { DeleteMessageActivityByUserInActivityUseCase } from "./DeleteMessageActivityByUserInActivityUseCase";
import { ZodError } from "zod";
import { DeleteMessageActivityByUserInActivityRequestSchema, DeleteMessageActivityByUserInActivityResponseSchema } from "./DeleteMessageActivityByUserInActivityDTO";


export class DeleteMessageActivityByUserInActivityControler {
    constructor(
        private deleteMessageActivityByUserInActivityUseCase: DeleteMessageActivityByUserInActivityUseCase
    ) { }

    async handle(request: Request, response: Response) {
        try {
            const filter = DeleteMessageActivityByUserInActivityRequestSchema.parse(request.body);
            const messagesDeletdOrError = await this.deleteMessageActivityByUserInActivityUseCase.execute(filter);
            if (messagesDeletdOrError instanceof Error) {
                return response.status(500).json({ error: messagesDeletdOrError.message });
            }
            const responseInFormat = DeleteMessageActivityByUserInActivityResponseSchema.parse(messagesDeletdOrError);
            return response.status(200).json(responseInFormat)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }

}