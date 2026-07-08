import { Router } from "express";
import { committeeController } from "./committee.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { createCommitteeValidate } from "./committee.validate.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { checkAuth } from "../../middleware/checkAuth.js";

const router = Router()

router.post(
    "/",
    checkAuth(UserRole.ADMIN),
    validateRequest(createCommitteeValidate),
    committeeController.createCommittee,
)

router.get(
    "/",
    committeeController.getAllCommittee,
)

router.get(
    "/:id",
    committeeController.getSingleCommittee,
)

router.patch(
    "/:id",
    checkAuth(UserRole.ADMIN),
    validateRequest(createCommitteeValidate),
    committeeController.updateCommittee,
)

router.delete(
    "/:id",
    checkAuth(UserRole.ADMIN),
    committeeController.deleteCommittee,
)


export const committeeRouter = router