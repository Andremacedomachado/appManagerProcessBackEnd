import { ZodIssueCode, z } from "zod";
import { UserIsActive } from "../../../domain/entities/User";

import { keysUserField } from "../../repositories/IUserRepository";

const arrayFieldFilterUser: keysUserField = ["id", "name", "email", "status", "created_at", "updated_at", "organization_sector_id"]
const arrayFieldString: keysUserField = ["id", "name", "email", "status", "organization_sector_id"]
const arrayFieldDate: keysUserField = ["created_at", "updated_at"]
export const GetUserFieldSchema = z.array(z.enum([arrayFieldFilterUser[0], ...arrayFieldFilterUser.slice(1)])).optional()

export const GetUsersSchema = z.object({
    keys: GetUserFieldSchema,
    value: z.string().or(z.coerce.date()).optional()
}).transform(({ keys, value }, ctx) => {
    if (keys && !value) {
        ctx.addIssue({
            code: 'custom',
            message: 'When selecting a field, it is necessary to enter a value',
            path: ['value']
        })
    }

    if (keys && value) {
        if (typeof keys === 'string') {
            keys = [keys]
        }
        const keysMatchDate = keys.filter(k => arrayFieldDate.includes(k)).length > 0
        const keysMatchString = keys.filter(k => arrayFieldString.includes(k)).length > 0

        const keysMatchEnum = keys.filter(k => k == 'status').length > 0
        console.log(keysMatchDate, keysMatchString)
        if (keysMatchDate && keysMatchString) {
            ctx.addIssue({
                code: 'custom',
                message: 'When creating a filter, select only fields of the same type',
                path: ['keys'],
                params: keys
            })
        }

        if (keysMatchEnum) {
            if (typeof value === 'string') {
                value = value.toUpperCase()
            }
        }

        if (keysMatchDate) {
            value = new Date(value)
        }

    }

    return { keys, value }
})

export type GetUsersSchema = z.infer<typeof GetUsersSchema>

export const GetUserResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.date(),
    updated_at: z.date(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.string().uuid().nullable()

});
export type GetUserResponseData = z.infer<typeof GetUserResponseSchema>
export const GetUsersResponseSchema = z.array(GetUserResponseSchema)
export type GetUsersResponseData = z.infer<typeof GetUsersResponseSchema>