import { z } from "zod";
import { IUserProps, UserIsActive } from "../../../domain/entities/User";


export interface ICreateUserRequestDTO extends IUserProps { }

export const CreateUserInputSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().max(8)
        .refine(passwordString => /^(?=[a-zA-Z0-9]{4,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*/.test(passwordString), 'Passowrod Format Invald - enter a password with letters and numbers, and with a maximum of 8 digits'),
    organization_sector_id: z.string().uuid(),
    status: z.string()
        .refine(statusInRequest => (statusInRequest == UserIsActive.ACTIVE || statusInRequest == UserIsActive.INACTIVE), "inform a valid status, being ACTIVE or INACTIVE")
        .transform(statusInString => <UserIsActive>statusInString),
    created_at: z.string().optional()
        .transform(dateInString => dateInString ? new Date(dateInString) : new Date),
    updated_at: z.string().optional()
        .transform(dateInString => dateInString ? new Date(dateInString) : new Date),
});
