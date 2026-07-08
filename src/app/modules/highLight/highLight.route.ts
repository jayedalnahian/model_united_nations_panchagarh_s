import { Router } from "express";
import { highLightController } from "./highLight.controller.js";
import { createHighLightValidate } from "./highLight.validate.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { UserRole } from "../../generated/prisma/browser.js";
import { checkAuth } from "../../middleware/checkAuth.js";

const router = Router();

router.post("/", checkAuth(UserRole.ADMIN), validateRequest(createHighLightValidate), highLightController.createHighLight);
router.get("/", highLightController.getAllHighLight);
router.get("/:id", highLightController.getSingleHighLight);
router.patch("/:id", checkAuth(UserRole.ADMIN), validateRequest(createHighLightValidate), highLightController.updateHighLight);
router.delete("/:id", checkAuth(UserRole.ADMIN), highLightController.deleteHighLight);

export const highLightRoute = router