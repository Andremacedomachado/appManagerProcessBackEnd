import { Request, Response } from "express";
import { GetUserByCollectionIdsUseCase } from "./GetUserByCollectionIdsUseCase";
import { GetUserByColletionIdsRequestSchema, GetUserByColletionIdsResponseDTO, GetUserByColletionIdsResponseSchema, UserInColletionResponseDTO } from "./GetUserByCollectionIdsDTO";
import { ZodError } from "zod";

export class GetUserByCollectionIdsController {
    constructor(private getUserByCollectionIdsUseCase: GetUserByCollectionIdsUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { userIds } = GetUserByColletionIdsRequestSchema.parse(request.body);

            const userCollection = await this.getUserByCollectionIdsUseCase.execute(userIds);
            const duplicatedIds = [...new Set(userIds.filter((item, index) => userIds.indexOf(item) !== index))]
            const usersNotFound = [... new Set(userIds.filter(idSearch => !userCollection.some(user => user.id == idSearch)))]
            const reponseInFormat = GetUserByColletionIdsResponseSchema.parse(
                {
                    userInfoFound: userCollection.map(user => { return { id: user.id, ...user.props } as UserInColletionResponseDTO }),
                    inconsistenciesFound: {
                        idsRequestDuplicate: duplicatedIds,
                        userNotExistsInRequest: usersNotFound
                    }
                } as GetUserByColletionIdsResponseDTO
            );

            return response.status(200).json(reponseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(400).json(errors.issues)
            }
            return response.status(500).json({ error: "Unexpected Error", typeErrors: errors });
        }
    }
}