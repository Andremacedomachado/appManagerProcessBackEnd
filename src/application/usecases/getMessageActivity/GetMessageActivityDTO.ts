import { z } from "zod";
import { IMessageActivityProps, TYPEMESSAGE } from "../../../domain/entities/MessageActivity";
import { KeysMessageActivityFields } from "../../repositories/IMessageActivityRepository";


export const MessageActivitySchema = z.object({
    content: z.string(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.coerce.date(),
    updated_at: z.coerce.date()
})

export type MessageActivityData = z.infer<typeof MessageActivitySchema>
const arrayFieldKeysMessage: KeysMessageActivityFields = ['activity_id', 'user_id', "content", "publication_date", "type_message", "updated_at"]
const arrayFieldKeysStringMessage: KeysMessageActivityFields = ['activity_id', 'user_id', "content"]
const arrayFieldKeysDateMessage: KeysMessageActivityFields = ["publication_date", "updated_at"]
const arrayFieldKeysEnumMessage: KeysMessageActivityFields = ["type_message"]
export const GetMessageActivityFields = z.array(z.enum([arrayFieldKeysMessage[0], ...arrayFieldKeysMessage.splice(1)])).optional()

export const GetMessageActivitySchema = z.object({
    keys: GetMessageActivityFields,
    value: z.string().or(z.coerce.date()).optional(),
}).transform(({ keys, value }, ctx) => {
    if (!keys) {
        return { keys, value }
    }
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
        const keysMatchDate = keys.filter(k => arrayFieldKeysDateMessage.includes(k)).length > 0
        const keysMatchString = keys.filter(k => arrayFieldKeysStringMessage.includes(k)).length > 0

        const keysMatchEnum = keys.filter(k => arrayFieldKeysEnumMessage.includes(k)).length > 0
        if (keysMatchDate && keysMatchString) {
            ctx.addIssue({
                code: 'custom',
                message: 'When creating a filter, select only fields of the same type',
                path: ['keys'],
                params: keys
            })
        }

        if (keysMatchEnum) {
            if (typeof value === 'string' && (value.toUpperCase() in TYPEMESSAGE)) {
                value = value.toUpperCase()
            }
            else {
                ctx.addIssue({
                    code: 'custom',
                    message: 'When creating a filter and select one fields enum,  enter with value valid',
                    path: ['value'],
                    params: { value }
                })
            }
        }

        if (keysMatchDate) {
            value = new Date(value)
        }

        return { keys, value }
    }
})
export type GetMessageActivityData = z.infer<typeof GetMessageActivitySchema>