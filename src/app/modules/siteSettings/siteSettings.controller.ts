import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { Request, Response } from "express";
import { siteSettingsService } from "./siteSettings.service.js";

const createOrUpdateSiteSettings =  catchAsync(async (req: Request, res: Response) => {
    const result = await siteSettingsService.createOrUpdateSiteSettings(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Site setting created or updated successfully",
        data: result,
        error: null,
    })
})

const getSiteSettings = catchAsync(async (req: Request, res: Response) => {
  const result = await siteSettingsService.getSiteSettings();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Site setting get successfully",
    data: result,
    error: null,
  });
});


export const siteSettingsController = {
  createOrUpdateSiteSettings,
  getSiteSettings,
};
