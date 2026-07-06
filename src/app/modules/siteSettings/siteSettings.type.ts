import { z } from "zod";
import { siteSettingsCreateSchema } from "./siteSettings.validator.js";


export type ISiteSettingsPayload = z.infer<typeof siteSettingsCreateSchema>
