import { z } from "zod";

export const UpdateOrganizationSectorFormSchema = z.object({
    employeesAllocated: z.coerce.number().gte(0),
    name: z.string(),
    organization_id: z.string().uuid(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
}).partial().merge(z.object({ id: z.string().uuid() }))

export type UpdateOrganizationSectorFormData = z.infer<typeof UpdateOrganizationSectorFormSchema>