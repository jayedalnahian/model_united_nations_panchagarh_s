import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route.js";
import { SiteSettingsRouter } from "../modules/siteSettings/siteSettings.route.js";

const router = Router();

router.use("/auth", AuthRouter);

router.use("/site_settings", SiteSettingsRouter);

export const IndexRouter = router;
