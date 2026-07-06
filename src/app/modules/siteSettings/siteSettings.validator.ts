import { z } from "zod";

const siteSettingsCreateSchema = z.object({
    heroTitle: z.string().min(1).optional(),
    heroSubtitle: z.string().min(1).optional(),
    heroImageUrl: z.url().optional(),
    ctaText: z.string().min(1).optional(),
    ctaLink: z.url().optional(),
})

export { siteSettingsCreateSchema }