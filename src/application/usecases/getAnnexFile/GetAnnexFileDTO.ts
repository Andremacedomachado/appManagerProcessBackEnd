import { z } from "zod";
import { IAnnexActivityUnique } from "../../repositories/IAnnexActivityRepository";

export interface IGetAnnexFileRequestDTO extends IAnnexActivityUnique { }

export interface IGetAnnexFileDataResponseDTO {
    path: string,
    name: string,
    extension: string,
}

export const GetAnnexFileDataRequestSchema = z.object({
    original_name: z.string().min(3),
    publication_date: z.string().datetime({ precision: 3 })
        .transform(dateString => new Date(dateString))
})

export const GetAnnexFileDataResponseSchema = z.object({
    path: z.string(),
    name: z.string().min(3),
    extension: z.string()
})