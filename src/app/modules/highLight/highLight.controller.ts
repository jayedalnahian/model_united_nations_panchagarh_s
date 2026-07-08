
import { Request, Response } from "express"
import { catchAsync } from "../../shared/catchAsync.js"
import { sendResponse } from "../../shared/sendResponse.js"
import status from "http-status"
import { highLightService } from "./highLight.service.js"

const createHighLight = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await highLightService.createHighLight(payload)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "New highlight added successfully",
        data: result,
        error: null,
    })
})

const updateHighLight = catchAsync(async (req: Request, res: Response) => {
    const result = await highLightService.updateHighLight(req.params.id as string, req.body)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Highlight updated successfully",
        data: result,
        error: null,
    })
})

const getAllHighLight = catchAsync(async (req: Request, res: Response) => {
    const result = await highLightService.getAllHighLight()
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "All highlights get successfully",
        data: result,
        error: null,
    })
})

const getSingleHighLight = catchAsync(async (req: Request, res: Response) => {
    const result = await highLightService.getSingleHighLight(req.params.id as string)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Highlight get successfully",
        data: result,
        error: null,
    })
})

const deleteHighLight = catchAsync(async (req: Request, res: Response) => {
    const result = await highLightService.deleteHighLight(req.params.id as string)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Highlight deleted successfully",
        data: result,
        error: null,
    })
})



export const highLightController = {
    createHighLight,
    updateHighLight,
    getAllHighLight,
    getSingleHighLight,
    deleteHighLight,
};