import { Request, Response } from "express";
import { GetOrganizationSectorByIdUseCase } from "./GetOrganizationSectorByIdUseCase";

export class GetOrganizationSectorByIdController {
    constructor(private getOrganizationSectorByIdUseCase: GetOrganizationSectorByIdUseCase) { }

    async handle(request: Request, response: Response) {
        const { sectorId } = request.body
        try {
            const sectorOrError = await this.getOrganizationSectorByIdUseCase.execute(sectorId);
            if (sectorOrError instanceof Error) {
                return response.status(500).json({ error: sectorOrError.message })
            }
            return response.status(200).json(sectorOrError)

        } catch (error) {
            return response.status(500).json({ error: 'Unexpected Error' })

        }
    }
}