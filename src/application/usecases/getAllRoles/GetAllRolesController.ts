import { Request, Response } from "express";
import { GetAllRolesUsecase } from "./GetAllRolesUseCase";
import { GetAllRolesResponseDTO } from "./GetAllRolesDTO";



export class GetAllRolesController {
    constructor(private getAllRolesUseCase: GetAllRolesUsecase) { }

    async handle(request: Request, response: Response) {
        try {
            const roles = await this.getAllRolesUseCase.execute()
            if (!roles) {
                return response.status(200).json(roles)
            }
            const responseInFormat = GetAllRolesResponseDTO.parse(roles.map(role => ({ id: role.id, ...role.props })))
            return response.status(200).json(responseInFormat)
        } catch (error) {
            console.log(error)
            return response.status(500).json({
                message: 'Error internal',
                error: JSON.stringify(error)
            })
        }


    }
}