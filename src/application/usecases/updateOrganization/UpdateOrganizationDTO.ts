import { z } from "zod";

export const UpdateOrganizationFormSchema = z.object({
    employeesAllocated: z.number().gte(0),
    name: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
}).partial().merge(z.object({ id: z.string().uuid() }))

export type UpdateOrganizationFormData = z.infer<typeof UpdateOrganizationFormSchema>