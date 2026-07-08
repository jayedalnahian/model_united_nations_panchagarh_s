import { Router } from "express";
import { faqItemController } from "./faqItem.controller.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { create } from "domain";
import { createFaqItemValidate, updateFaqItemValidate } from "./faqItem.validate.js";

const router = Router();

router.post("/", checkAuth(UserRole.ADMIN), validateRequest(createFaqItemValidate), faqItemController.createFaqItem);
router.get("/", faqItemController.getAllFaqItems);
router.get("/:id", faqItemController.getFaqItemById);
router.patch("/:id", checkAuth(UserRole.ADMIN), validateRequest(updateFaqItemValidate), faqItemController.updateFaqItemById);
router.delete("/:id", checkAuth(UserRole.ADMIN), faqItemController.deleteFaqItemById);



export const faqItemRoute = router