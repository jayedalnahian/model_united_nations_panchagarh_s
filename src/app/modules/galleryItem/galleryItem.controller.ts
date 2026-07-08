import { Request, Response } from "express"
import { catchAsync } from "../../shared/catchAsync.js"
import { galleryItemService } from "./ galleryItem.service.js"
import { sendResponse } from "../../shared/sendResponse.js"
import status from "http-status"


const createGalleryItem = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await galleryItemService.createGalleryItem(payload)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "New gallery item added successfully",
        data: result,
        error: null,
    })
})

const getAllGalleryItems = catchAsync(async (req: Request, res: Response) => {
    const result = await galleryItemService.getAllGalleryItems()
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "All gallery items get successfully",
        data: result,
        error: null,
    })
})

const getGalleryItemById = catchAsync(async (req: Request, res: Response) => {
    const result = await galleryItemService.getGalleryItemById(req.params.id as string)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Gallery item get successfully",
        data: result,
        error: null,
    })
})

const updateGalleryItemById = catchAsync(async (req: Request, res: Response) => {
    const result = await galleryItemService.updateGalleryItemById(req.params.id as string, req.body)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Gallery item updated successfully",
        data: result,
        error: null,
    })
})

const deleteGalleryItemById = catchAsync(async (req: Request, res: Response) => {
    const result = await galleryItemService.deleteGalleryItemById(req.params.id as string)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Gallery item deleted successfully",
        data: result,
        error: null,
    })
})








export const galleryItemController = {
    createGalleryItem,
    getAllGalleryItems,
    getGalleryItemById,
    updateGalleryItemById,
    deleteGalleryItemById
}