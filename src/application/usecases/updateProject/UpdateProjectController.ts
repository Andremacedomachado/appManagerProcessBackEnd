import { Request, Response } from "express";
import { UpdateProjectUseCase } from "./UpdateProjectUseCase";
import { UpdateProjectRequestSchema, UpdateProjectResponseSchema } from "./UpdateProjectDTO";
import { Issueing } from "../../../domain/entities/Issueing";
import { ZodError } from "zod";

export class UpdateProjecController {

    constructor(private updateProjectUseCase: UpdateProjectUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const dataPayload = UpdateProjectRequestSchema.parse(request.body)
            const payloadIssueing = Issueing.getIssueingInPayloadRequest(request)
            if (!payloadIssueing) {
                return response.json({
                    error: "Unauthorize access"
                }).status(401)
            }
            const projectUpdated = await this.updateProjectUseCase.execute(payloadIssueing.userId, dataPayload)
            const responseInFormat = UpdateProjectResponseSchema.parse({ id: projectUpdated.id, ...projectUpdated.props })
            return response.json(responseInFormat).status(200)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });

        }
    }
}