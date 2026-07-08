import { Request, Response } from "express"
import { catchAsync } from "../../shared/catchAsync.js"
import { committeeService } from "./committee.service.js"
import { sendResponse } from "../../shared/sendResponse.js"
import status from "http-status"


const createCommittee = catchAsync(async (req: Request, res: Response) => {
    
    const payload = req.body
    
    const result = committeeService.createCommittee(payload)

     sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "New committee added successfully",
        data: result,
        error: null,
    })
})

const getAllCommittee = catchAsync(async (req: Request, res: Response) => {
     const result = await committeeService.getAllCommittee(req.query)
        sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "All committees get successfully",
        data: result.data,
        meta: result.meta,
        error: null,
    })
})

const getSingleCommittee = catchAsync(async (req: Request, res: Response) => {
     const result = await committeeService.getSingleCommittee(req.params.id as string)
        sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Committee get successfully",
        data: result,
        error: null,
    })
})

const updateCommittee = catchAsync(async (req: Request, res: Response) => {
    const result = await committeeService.updateCommittee(req.params.id as string, req.body)
        sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Committee updated successfully",
        data: result,
        error: null,
    })
})

const deleteCommittee = catchAsync(async (req: Request, res: Response) => {
    const result = await committeeService.deleteCommittee(req.params.id as string)
        sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Committee deleted successfully",
        data: result,
        error: null,
    })
})




export const committeeController = {
    createCommittee,
    getAllCommittee,
    getSingleCommittee,
    updateCommittee,
    deleteCommittee
}