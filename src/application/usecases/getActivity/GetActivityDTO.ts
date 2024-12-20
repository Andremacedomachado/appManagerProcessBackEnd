import { z } from "zod"
import { isValid } from "date-fns"
import { STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity"
import { KeysActivityFields } from "../../repositories/IActivityRepository"
import { QueryHelp } from "../../../domain/entities/QueryHelp"

export interface IGetActivityRequestDTO {
    title: string
}

const keysActivityFieldsDate = QueryHelp.extractKeysOfActivityByType(new Date);
const keysActivityFieldsString = QueryHelp.extractKeysOfActivityByType('new string')
const keysActivityFields = QueryHelp.extractKeysOfActivityByType(undefined)

export const GetActivityFieldsSchema = z.array(z.enum([keysActivityFields[0], ...keysActivityFields.slice(1)]))
export const GetActivityFieldsValue = z.array(z.string().or(z.coerce.date()).nullable())

export const GetActivityRequestSchema = z.object({
    keys: GetActivityFieldsSchema,
    values: GetActivityFieldsValue
}).transform(({ keys, values }, ctx) => {

    if (!QueryHelp.isFormatQueryValid(keys, values)) {
        ctx.addIssue({
            code: 'custom',
            message: 'When selecting a field, it is necessary to enter a values and keys corretly',
            path: ['value', "keys"]
        })

        console.log("situação sem dados com um ou mais campos:", values, keys)
        return { keys, values }
    }

    values = QueryHelp.parseQueryToValue(values)


    if (keys.length == values.length) {
        const inconsistFound = QueryHelp.checkInconsistencyInPairedValues(keys, keysActivityFieldsDate, keysActivityFieldsString, values)
        if (inconsistFound) {
            ctx.addIssue({
                code: 'custom',
                message: 'When creating a filter, select fields and values allowed',
                path: ['keys'],
                params: keys
            })

            console.log("situação inconsistencia em dados pareado:", values, keys)
            return { keys, values }
        }

        console.log("situação pareado com sucesso:", values, keys)
        return { keys, values }
    }
    if (values.length == 1) {
        if (typeof keys === 'string') {
            keys = [keys]
        }

        const inconsistFound = QueryHelp.checkInconsitencyInValuePerMultipleKeys(keys, keysActivityFieldsDate, keysActivityFieldsString, values[0])
        if (inconsistFound) {
            ctx.addIssue({
                code: 'custom',
                message: 'When creating a filter, select only fields of the same type',
                path: ['keys'],
                params: keys
            })

            console.log("situação inconsistencia em dados pra multiplos filtros:", values, keys)
        }

        return { keys, values }
    }

    console.log("situação nao avaliada", values, keys)
})

export type GetActivityRequestData = z.infer<typeof GetActivityRequestSchema>

export const GetActivityResponseSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3),
    description: z.string().nullable(),
    responsible_id: z.string().uuid(),
    start_date: z.date().optional()
        .transform(date => !date ? null : date),
    due_date: z.coerce.date().nullable().optional().transform(date => date ? date : null),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]).nullable(),
    created_at: z.date(),
    updated_at: z.date(),
    conclusion_date: z.coerce.date().nullable(),
    project_id: z.string().uuid()
})

export type ActivityReponseType = z.input<typeof GetActivityResponseSchema>

export const GetActivitiesResponseSchema = z.array(GetActivityResponseSchema)

export type GetActivitiesResponseData = z.input<typeof GetActivitiesResponseSchema>