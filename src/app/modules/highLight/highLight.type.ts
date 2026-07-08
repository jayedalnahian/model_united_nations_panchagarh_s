import z from "zod";
import { createGalleryItemValidate, updateGalleryItemValidate } from "../galleryItem/galleryItem.validate.js";

export type createGalleryItemType = z.infer<typeof createGalleryItemValidate>;
export type updateGalleryItemType = z.infer<typeof updateGalleryItemValidate>;