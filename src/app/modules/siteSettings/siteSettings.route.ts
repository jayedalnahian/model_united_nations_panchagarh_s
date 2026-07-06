import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { siteSettingsCreateSchema } from "./siteSettings.validator.js";
import { siteSettingsController } from "./siteSettings.controller.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { UserRole } from "../../generated/prisma/enums.js";

const router = Router();

router.post(
    "/",
    checkAuth(UserRole.ADMIN),
    validateRequest(siteSettingsCreateSchema),
    siteSettingsController.createOrUpdateSiteSettings,
)

router.get(
    "/",
    siteSettingsController.getSiteSettings,
)






export const SiteSettingsRouter = router;