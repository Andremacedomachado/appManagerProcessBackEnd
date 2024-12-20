import { keys } from "ts-transformer-keys"
import { IActivityProps } from "./Activity"
import { KeysActivityFields } from "../../application/repositories/IActivityRepository";
import { isValid } from "date-fns";
import { IProjectProps } from "./Project";

type KeysMatching<T extends object, V> = {
    [K in keyof T]-?: T[K] extends V ? T[K] : never
};
type OmitNeverProps<T> = { [K in keyof T as T[K] extends never | ((...arg: any) => never) ? never : K]: T[K] }

type TypeAlloweds = Date | string | null | number | undefined;

export interface IActivityPropsPrimitive extends IActivityProps {
    id: string
}
type TActyvityQuery = Record<keyof IActivityPropsPrimitive, string | undefined>
type TActivityOnlyFieldsDate = OmitNeverProps<KeysMatching<IActivityPropsPrimitive, Date | null | undefined>>
type TActivityOnlyFieldsString = OmitNeverProps<KeysMatching<IActivityPropsPrimitive, string | null | undefined>>

export interface IProjectPropsPrimitive extends IProjectProps {
    id: string
}

export interface IProjectQuery {
    keys: Array<keyof IProjectPropsPrimitive>,
    values: Array<TypeAlloweds>
}
type TProjectOnlyFieldsDate = OmitNeverProps<KeysMatching<IProjectPropsPrimitive, Date | null | undefined>>
type TProjectOnlyFieldsString = OmitNeverProps<KeysMatching<IProjectPropsPrimitive, string | null | undefined>>

export abstract class QueryHelp {

    static isFormatQueryValid(keys?: string[], values?: TypeAlloweds[]) {
        if (!keys || !values) {
            return false
        }
        if (keys.length == 0 || values.length == 0) {
            return false
        }
        if (keys.length == values.length || values.length == 1) {
            return true
        }
        return false
    }

    static parseQueryToValue<T extends TypeAlloweds>(arrayValues: Array<T>) {
        const valuesParsed = arrayValues.map(v => {
            if (v == 'null')
                return null
            if (v && isValid(v)) {
                return new Date(v)
            }
            return v
        })

        /*  const objParsed = keysObject.map((k, index) => ({
             [k]: valuesParsed[index]
         })).reduce((prev, curr) => {
             Object.assign(prev, curr)
             return prev
         }, {}) */

        return valuesParsed
    }

    static checkInconsistencyInPairedValues(keys: string[], keysDate: string[], keysString: string[], values: TypeAlloweds[]) {

        const isInconsist = keys.reduce((prev, curr, index) => {
            if (prev) {
                return prev
            }
            if (keysDate.includes(curr) && (values[index] && !isValid(new Date(values[index] as string)))) {
                return true
            }
            if (keysString.includes(curr) && (values[index] && isValid(new Date(values[index] as string)) || values[index] == null)) {
                return true
            }
            return false
        }, false)
        return isInconsist
    }

    static checkInconsitencyInValuePerMultipleKeys(keys: string[], keysDate: string[], keysString: string[], values: TypeAlloweds) {
        const occurrenceMapping = keys.reduce((prev, curr) => {
            if (keysDate.includes(curr)) {
                prev.date = prev.date + 1
            }
            if (keysString.includes(curr)) {
                prev.string = prev.string + 1
            }
            return prev
        }, {
            date: 0,
            string: 0,
            total: keys.length
        })
        console.log(occurrenceMapping)
        if (occurrenceMapping.date == occurrenceMapping.total || occurrenceMapping.string == occurrenceMapping.total) {
            return false
        }
        return true
    }

    static extractKeysOfActivityByType<T extends TypeAlloweds>(objRef: T): (keyof IActivityPropsPrimitive)[] {

        if (objRef instanceof Date) {
            const keysFieldsDate: Array<keyof TActivityOnlyFieldsDate> = ['due_date', 'start_date', "updated_at", "created_at", "conclusion_date"]
            return keysFieldsDate
        }

        if (objRef == undefined) {
            const keysFieldsAll: Array<keyof IActivityPropsPrimitive> = ["id", "title", "description", "progress_status", "responsible_id", "type_node", "project_id", "sector_id", 'due_date', 'start_date', "updated_at", "created_at", "conclusion_date"]
            return keysFieldsAll
        }
        const keysFieldsString: Array<keyof TActivityOnlyFieldsString> = ["id", "title", "description", "progress_status", "responsible_id", "type_node", "project_id", "sector_id"]
        return keysFieldsString
    }

    static extractKeysOfProjectByType<T extends TypeAlloweds>(objRef: T): (keyof IProjectPropsPrimitive)[] {
        if (objRef instanceof Date) {
            const keysFieldsDate: Array<keyof TProjectOnlyFieldsDate> = ['created_at', 'updated_at']
            return keysFieldsDate
        }
        if (objRef == undefined) {
            const keyFieldsAll: Array<keyof IProjectPropsPrimitive> = ['id', 'title', 'description', 'created_at', "updated_at"]
            return keyFieldsAll
        }

        const keysFieldsString: Array<keyof TProjectOnlyFieldsString> = ['id', 'title', 'description']
        return keysFieldsString
    }

}