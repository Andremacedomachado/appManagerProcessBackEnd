import { Request, Response } from "express";
import { GetOrganizationByIdUseCase } from "./GetOrganizationByIdUseCase";



export class GetOrganizationByIdController {

    constructor(private getOrganizationByIdUseCase: GetOrganizationByIdUseCase) { };

    async handle(request: Request, response: Response) {
        const { organizationId } = request.body
        try {
            const organizationOrError = await this.getOrganizationByIdUseCase.execute(organizationId);
            if (organizationOrError instanceof Error) {
                return response.status(500).json({ error: organizationOrError.message });
            }
            return response.status(200).json(organizationOrError);

        } catch (error) {
            return response.status(500).json({ error: 'Unexpected Error' });
        }
    }
}