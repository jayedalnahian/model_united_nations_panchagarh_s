import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { createGalleryItemValidate } from "./galleryItem.validate.js";
import { galleryItemController } from "./galleryItem.controller.js";

const router = Router()


router.post("/", checkAuth(UserRole.ADMIN), validateRequest(createGalleryItemValidate), galleryItemController.createGalleryItem);
router.get("/", galleryItemController.getAllGalleryItems);
router.get("/:id", galleryItemController.getGalleryItemById);
router.patch("/:id", checkAuth(UserRole.ADMIN), validateRequest(createGalleryItemValidate), galleryItemController.updateGalleryItemById);
router.delete("/:id", checkAuth(UserRole.ADMIN), galleryItemController.deleteGalleryItemById);

export const galleryItemRoute = router