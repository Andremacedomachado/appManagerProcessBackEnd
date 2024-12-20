import { Request, Response } from "express";
import { CreateActivityUseCase } from "./CreateActivityUseCase";
import { CreateActivityRequestData, CreateActivityRequestSchema, CreateActivityResponseSchema, ICreateActivityRequestDTO } from "./CreateActivityDTO";
import { ZodError } from "zod";
import { verify } from "jsonwebtoken";
import { Issueing } from "../../../domain/entities/Issueing";


export class CreateActivityController {
    constructor(private createActivityUseCase: CreateActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const payloadToken = Issueing.getIssueingInPayloadRequest(request)

            if (payloadToken instanceof String || payloadToken == null) {
                return response.status(401)
            }
            const datapayload = CreateActivityRequestSchema.parse(request.body);

            console.log(payloadToken, datapayload)

            const activityIdOrError = await this.createActivityUseCase.excute(payloadToken.userId, datapayload);

            if (activityIdOrError instanceof Error) {
                return response.status(400).json({ error: activityIdOrError.message });
            }
            const responseInFormat = CreateActivityResponseSchema.parse(activityIdOrError)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected error', typeError: errors });
        }
    }

}