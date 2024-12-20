import { IMessageActivityRepository } from "../../repositories/IMessageActivityRepository";
import { GetMessageActivityData } from "./GetMessageActivityDTO";

export class GetMessageActivityUseCase {
    constructor(private messageActivity: IMessageActivityRepository) { }

    async execute(query: GetMessageActivityData) {
        return await this.messageActivity.findMany(query)
    }
}