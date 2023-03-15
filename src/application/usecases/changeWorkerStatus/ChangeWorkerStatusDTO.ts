import { z } from "zod";
import { IUserUpdateProps } from "../../repositories/IUserRepository";
import { UserIsActive } from "../../../domain/entities/User";

export interface IChangeWorkerStatusRequestDTO extends IUserUpdateProps {

}

export const ChangeStatusRequestSchema = z.object({
    userId: z.string().uuid(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE])
});