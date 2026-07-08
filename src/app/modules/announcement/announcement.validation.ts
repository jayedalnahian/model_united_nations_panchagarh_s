
import z from "zod";

export const CreateAnnouncementSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    body: z.string().min(1, { message: "Body is required" }),
    isPinned: z.boolean().optional(),
    isActive: z.boolean().optional(),
    publishedAt: z.date().optional(),
});


export const UpdateAnnouncementPayload = z.object({
    title: z.string().optional(),
    body: z.string().optional(),
    isPinned: z.boolean().optional(),
    isActive: z.boolean().optional(),
    publishedAt: z.date().optional(),
})