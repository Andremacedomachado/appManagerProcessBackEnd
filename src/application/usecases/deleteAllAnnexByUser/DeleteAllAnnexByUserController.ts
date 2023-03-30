import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteAllAnnexActivtyByUserRequestSchema, DeleteAllAnnexActivtyByUserResponseSchema } from "./DeleteAllAnnexByUserDTO";
import { DeleteAllAnnexActivtyByUserUseCase } from "./DeleteAllAnnexByUserUseCase";

export class DeleteAllAnnexActivityByUserController {
    constructor(private deleteAllAnnexActivityByUserUseCase: DeleteAllAnnexActivtyByUserUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const filter = DeleteAllAnnexActivtyByUserRequestSchema.parse(request.body);

            const annexDeletedOrError = await this.deleteAllAnnexActivityByUserUseCase.execute(filter);
            if (annexDeletedOrError instanceof Error) {
                return response.status(500).json({ error: annexDeletedOrError.message });
            }
            const responseInFormat = DeleteAllAnnexActivtyByUserResponseSchema.parse(annexDeletedOrError)
            return response.status(200).json(responseInFormat)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}