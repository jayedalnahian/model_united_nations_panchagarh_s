import { prisma } from "../../lib/prisma.js";
import { createFaqItemType, updateFaqItemType } from "./faqItem.type.js"

const createFaqItem = async (payload: createFaqItemType) => {
    const result = await prisma.faqItem.create({
        data: payload
    })
    return result;
}

const getAllFaqItems = async () => {
    const result = await prisma.faqItem.findMany();
    return result;
}

const getFaqItemById = async (id: string) => {
    const result = await prisma.faqItem.findUnique({
        where: {
            id: id
        }
    })
    return result;
}

const updateFaqItemById = async (id: string, payload: updateFaqItemType) => {
    const result = await prisma.faqItem.update({
        where: {
            id: id
        },
        data: payload
    })
    return result;
}

const deleteFaqItemById = async (id: string) => {
    const result = await prisma.faqItem.delete({
        where: {
            id: id
        }
    })
    return result;
}   









export const faqItemService = {
    createFaqItem,
    getAllFaqItems,
    getFaqItemById,
    updateFaqItemById,
    deleteFaqItemById
}