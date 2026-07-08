import z from "zod";




// model GalleryItem {
//   id         String   @id @default(cuid())
//   mediaUrl   String
//   caption    String?
//   descriptin String?
//   order      Int      @default(0)
//   isActive   Boolean  @default(true)
//   createdAt  DateTime @default(now())
//   updatedAt  DateTime @updatedAt
// }

export const createGalleryItemValidate = z.object({
    mediaUrl: z.url("Media URL is required"),
    caption: z.string().optional(),
    descriptin: z.string().optional(),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
})


export const updateGalleryItemValidate = z.object({
    mediaUrl: z.url("Media URL is required").optional(),
    caption: z.string().optional(),
    descriptin: z.string().optional(),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
})