import { Request, Response } from "express"
import { catchAsync } from "../../shared/catchAsync.js"
import { announcementService } from "./announcement.service.js"
import { sendResponse } from "../../shared/sendResponse.js"
import status from "http-status"

const createAnnouncement = catchAsync(async (req: Request, res: Response) => {
    
    const payload = req.body
    
    const result = announcementService.createAnnouncement(payload)

     sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "New announcement added successfully",
        data: result,
        error: null,
    })
})


const getAllAnnouncement = catchAsync(async (req: Request, res: Response) => {
     const result = await announcementService.getAllAnnouncement(req.query)
        sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "All announcements get successfully",
        data: result.data,
        meta: result.meta,
        error: null,
    })
})


const getSingleAnnouncement = catchAsync(async (req: Request, res: Response) => {
     const result = await announcementService.getSingleAnnouncement(req.params.id as string)
        sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Announcement get successfully",
        data: result,
        error: null,
    })
})


const updateAnnouncement = catchAsync(async (req: Request, res: Response) => {
    const result = await announcementService.updateAnnouncement(req.params.id as string, req.body)
        sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Announcement updated successfully",
        data: result,
        error: null,
    })
})


const deleteAnnouncement = catchAsync(async (req: Request, res: Response) => {
    const result = await announcementService.deleteAnnouncement(req.params.id as string)
        sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Announcement deleted successfully",
        data: result,
        error: null,
    })
})














export const announcementController = {
    createAnnouncement,
    getAllAnnouncement,
    getSingleAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
}