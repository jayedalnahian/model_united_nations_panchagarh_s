import z from "zod";
import { createFaqItemValidate, updateFaqItemValidate } from "./faqItem.validate.js";

export type createFaqItemType = z.infer<typeof createFaqItemValidate>;
export type updateFaqItemType = z.infer<typeof updateFaqItemValidate>;