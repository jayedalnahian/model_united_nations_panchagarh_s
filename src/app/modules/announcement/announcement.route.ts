import { Router } from "express"
import { checkAuth } from "../../middleware/checkAuth.js"
import { UserRole } from "../../generated/prisma/enums.js"
import { validateRequest } from "../../middleware/validateRequest.js"
import { siteSettingsCreateSchema } from "../siteSettings/siteSettings.validator.js"

import { announcementController } from "./announcement.controller.js"

const router = Router()




router.post(
    "/",
    checkAuth(UserRole.ADMIN),
    validateRequest(siteSettingsCreateSchema),
    announcementController.createAnnouncement,
)

router.get(
    "/",
    announcementController.getAllAnnouncement,
)

router.get(
    "/:id",
    announcementController.getSingleAnnouncement,
)

router.patch(
    "/:id",
    checkAuth(UserRole.ADMIN),
    validateRequest(siteSettingsCreateSchema),
    announcementController.updateAnnouncement,
)

router.delete(
    "/:id",
    checkAuth(UserRole.ADMIN),
    announcementController.deleteAnnouncement,
)



export const announcementRoutes = router