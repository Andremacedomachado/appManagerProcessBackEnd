import { Request, Response } from "express";
import { GetAllOrganizationSectorUseCase } from "./GetAllOrganizationSectorUseCase";

export class GetAllOrganizationSectorController {
    constructor(private getAllOrganizationSectorUseCase: GetAllOrganizationSectorUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const sectorOrError = await this.getAllOrganizationSectorUseCase.execute();
            if (sectorOrError instanceof Error) {
                return response.status(500).json({ error: sectorOrError.message })
            }
            return response.status(200).json(sectorOrError)

        } catch (error) {
            return response.status(500).json({ error: 'Unexpected Error' })

        }
    }
}