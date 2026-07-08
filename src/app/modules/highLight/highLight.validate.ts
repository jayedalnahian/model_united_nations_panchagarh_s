import z from "zod";



// model Highlight {
//   id        String   @id @default(cuid())
//   icon      String?
//   title     String
//   subtitle  String?
//   order     Int      @default(0)
//   isActive  Boolean  @default(true)
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }




export const createHighLightValidate = z.object({
    icon: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
})


export const updateHighLightValidate = z.object({
    icon: z.string().optional(),
    title: z.string().min(1, "Title is required").optional(),
    subtitle: z.string().optional(),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
})



