import { z } from "zod"
import { QueryHelp } from "../../../domain/entities/QueryHelp"

const keysProjectFields = QueryHelp.extractKeysOfProjectByType(undefined)
const keysProjectFieldsDate = QueryHelp.extractKeysOfProjectByType(new Date)
const keysProjectFieldsString = QueryHelp.extractKeysOfProjectByType('new string')

export const GetProjectRequestSchema = z.object({
    keys: z.array(z.enum([keysProjectFields[0], ...keysProjectFields.slice(1)])),
    values: z.array(z.string().or(z.coerce.date()).nullable())
}).transform(({ keys, values }, ctx) => {
    if (!QueryHelp.isFormatQueryValid(keys, values)) {
        ctx.addIssue({
            code: 'custom',
            message: 'When selecting a field, it is necessary to enter a values and keys corretly',
            path: ['value', "keys"]
        })
        return { keys, values }
    }

    values = QueryHelp.parseQueryToValue(values)

    if (keys.length == values.length) {
        const inconsistFound = QueryHelp.checkInconsistencyInPairedValues(keys, keysProjectFieldsDate, keysProjectFieldsString, values)
        if (inconsistFound) {
            ctx.addIssue({
                code: 'custom',
                message: 'When creating a filter, select fields and values allowed',
                path: ['keys'],
                params: keys
            })
            return { keys, values }
        }
        return { keys, values }
    }
    if (values.length == 1) {
        if (typeof keys === 'string') {
            keys = [keys]
        }

        const inconsistFound = QueryHelp.checkInconsitencyInValuePerMultipleKeys(keys, keysProjectFieldsDate, keysProjectFieldsString, values[0])
        if (inconsistFound) {
            ctx.addIssue({
                code: 'custom',
                message: 'When creating a filter, select only fields of the same type',
                path: ['keys'],
                params: keys
            })
        }

        return { keys, values }
    }
    return { keys, values }
})

export type GetProjectRequestData = z.infer<typeof GetProjectRequestSchema>

export const GetProjectResponseSchema = z.array(z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().nullable(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date()
})).nullable()

export type GetProjectResponseData = z.infer<typeof GetProjectResponseSchema>