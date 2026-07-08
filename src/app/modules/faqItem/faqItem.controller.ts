import { Request, Response } from "express"
import { catchAsync } from "../../shared/catchAsync.js"
import { sendResponse } from "../../shared/sendResponse.js"
import { faqItemService } from "./faqItem.service.js"
import status from "http-status"



const createFaqItem = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await faqItemService.createFaqItem(payload)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "New faq item added successfully",
        data: result,
        error: null,
    })
})

const getAllFaqItems = catchAsync(async (req: Request, res: Response) => {
    const result = await faqItemService.getAllFaqItems()
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "All faq items get successfully",
        data: result,
        error: null,
    })
})

const getFaqItemById = catchAsync(async (req: Request, res: Response) => {
    const result = await faqItemService.getFaqItemById(req.params.id as string)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Faq item get successfully",
        data: result,
        error: null,
    })
})

const updateFaqItemById = catchAsync(async (req: Request, res: Response) => {
    const result = await faqItemService.updateFaqItemById(req.params.id as string, req.body)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Faq item updated successfully",
        data: result,
        error: null,
    })
})

const deleteFaqItemById = catchAsync(async (req: Request, res: Response) => {
    const result = await faqItemService.deleteFaqItemById(req.params.id as string)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Faq item deleted successfully",
        data: result,
        error: null,
    })
})


export const faqItemController = {
    createFaqItem,
    getAllFaqItems,
    getFaqItemById,
    updateFaqItemById,
    deleteFaqItemById
}