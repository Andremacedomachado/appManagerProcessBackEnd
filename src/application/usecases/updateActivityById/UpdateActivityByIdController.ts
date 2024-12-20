import { Request, Response } from "express";
import { UpdateActivityByIdUseCase } from "./UpdateActivityByIdUseCase";
import { UpdateActivityByIdRequestSchema, UpdateActivityByIdResponseDTO, UpdateActivityByIdResponseSchema } from "./UpdateActivityByIdDTO";
import { ZodError } from "zod";
import { Issueing } from "../../../domain/entities/Issueing";

export class UpdateActivityByIdController {
    constructor(private updateActivityByIdUseCase: UpdateActivityByIdUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const activityId = request.params
            const dataPayload = UpdateActivityByIdRequestSchema.parse({ ...request.params, ...request.body })
            const payload = Issueing.getIssueingInPayloadRequest(request);
            if (!payload) {
                return response.json({
                    error: "Unauthorize access"
                }).status(401)
            }
            console.log('REQUEST DATA CLIENT::', dataPayload, request.body, payload)
            const activityOrError = await this.updateActivityByIdUseCase.execute(payload?.userId, dataPayload);
            console.log('RESPONSE DATA::', activityOrError)
            if (activityOrError instanceof Error) {
                return response.json({ error: activityOrError.message }).status(401)
            }
            const responseInFormat = UpdateActivityByIdResponseSchema.parse({
                id: activityOrError.id,
                ...activityOrError.props
            } as UpdateActivityByIdResponseDTO)
            return response.status(200).json(responseInFormat)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }

            if (errors instanceof Error) {
                return response.status(400).json({
                    error: errors.message
                });
            }
            console.log(errors)
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}