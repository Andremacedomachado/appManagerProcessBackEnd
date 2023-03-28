import { IUserRepository } from "../../repositories/IUserRepository";

export class GetUserByCollectionIdsUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(ids: string[]) {
        const usersFound = await this.userRepository.findManyByCollenctionIds(ids);
        return usersFound
    }

}