import z from "zod";
import { CreateAnnouncementSchema, UpdateAnnouncementPayload } from "./announcement.validation.js";

export type IAnnouncementPayload = z.infer<typeof CreateAnnouncementSchema>

export type IUpdateAnnouncementPayload = z.infer<typeof UpdateAnnouncementPayload>