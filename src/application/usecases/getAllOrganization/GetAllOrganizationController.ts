import { Request, Response } from "express";
import { GetAllOrganizationUseCase } from "./GetAllOrganizationUseCase";


export class GetAllOrganizationController {

    constructor(private getAllOrganizationUseCase: GetAllOrganizationUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const organizationOrError = await this.getAllOrganizationUseCase.execute();
            if (organizationOrError instanceof Error) {
                return response.status(500).json({ error: organizationOrError.message });
            }
            return response.status(200).json(organizationOrError);

        } catch (error) {
            return response.status(500).json({ error: "Unexpected Error" });
        }
    }
}