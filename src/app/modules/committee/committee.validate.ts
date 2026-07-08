import z from "zod";

export const createCommitteeValidate = z.object({
    name: z.string().min(1, "Committee name is required"),
    slug: z.string().min(1, "Committee slug is required"),
    description: z.string().min(1, "Committee description is required"),
    agendaTopic: z.string().min(1, "Committee agenda topic is required"),
    backgroundGuideUrl: z.url("Committee background guide URL must be a valid URL").optional(),
    capacity: z.number().int().positive("Committee capacity must be a positive integer").optional(),
})


export const updateCommitteeValidate = z.object({
    name: z.string().min(1, "Committee name is required").optional(),
    slug: z.string().min(1, "Committee slug is required").optional(),
    description: z.string().min(1, "Committee description is required").optional(),
    agendaTopic: z.string().min(1, "Committee agenda topic is required").optional(),
    backgroundGuideUrl: z.url("Committee background guide URL must be a valid URL").optional(),
    capacity: z.number().int().positive("Committee capacity must be a positive integer").optional(),
    order: z.number().int().positive("Committee order must be a positive integer").optional(),
    isActive: z.boolean().optional(),
})