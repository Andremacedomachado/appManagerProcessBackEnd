import { Request, Response } from "express";
import { GetSectorsByOrganizationIdUseCase } from "./GetSectorsByOrganizationIdUseCase";
import { GetSectorsByOrganizationIdRequestSchema, GetSectorsByOrganizationIdResponseSchema, SectorsByOrganizationIdResponseType } from "./GetSectorsByOrganizationIdDTO";
import { ZodError } from "zod";


export class GetSectorsByOrganizationIdController {
    constructor(private getSectorsByOrganizationIdUseCase: GetSectorsByOrganizationIdUseCase) {
    }

    async handle(request: Request, response: Response) {
        try {
            const { organizationId } = GetSectorsByOrganizationIdRequestSchema.parse(request.body)
            const sectorsOrError = await this.getSectorsByOrganizationIdUseCase.execute(organizationId)
            if (sectorsOrError instanceof Error) {
                return response.status(400).json({ error: sectorsOrError.message })
            }
            const responseInFormat = GetSectorsByOrganizationIdResponseSchema.parse(sectorsOrError.map(sector => {
                return { ...sector.props, id: sector.id } as SectorsByOrganizationIdResponseType
            }))
            return response.status(200).json(responseInFormat)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error' });
        }
    }
}