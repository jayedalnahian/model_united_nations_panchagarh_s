import status from "http-status";

import AppError from "../../errorHalpers/AppError.js";
import { ISiteSettingsPayload } from "./siteSettings.type.js";
import { prisma } from "../../lib/prisma.js";

const createOrUpdateSiteSettings = async (payload: ISiteSettingsPayload) => {
  try {
    return await prisma.siteSettings.upsert({
      where: {
        id: "singleton",
      },
      update: payload,
      create: {
        id: "singleton",
        ...payload,
      },
    });
  } catch (error) {
    throw new AppError(
      status.BAD_REQUEST,
      "Failed to save site settings"
    );
  }
};

const getSiteSettings = async () => {
  try {
    return await prisma.siteSettings.findUnique({
      where: {
        id: "singleton",
      },
    });
  } catch (error) {
    throw new AppError(
      status.BAD_REQUEST,
      "Failed to fetch site settings"
    );
  }
};

export const siteSettingsService = {
  createOrUpdateSiteSettings,
  getSiteSettings,
};
