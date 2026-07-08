import { prisma } from "../../lib/prisma.js";
import { createGalleryItemType, updateGalleryItemType } from "./highLight.type.js";


const createHighLight = async (payload: createGalleryItemType) => {
    const result = await prisma.highLight.create({
        data: payload
    })
    return result;
}

const updateHighLight = async (id: string, payload: updateGalleryItemType) => {
    const result = await prisma.highLight.update({
        where: {
            id: id
        },
        data: payload
    })
    return result;
}

const getAllHighLight = async () => {
    const result = await prisma.highLight.findMany();
    return result;
}

const getSingleHighLight = async (id: string) => {
    const result = await prisma.highLight.findUnique({
        where: {
            id: id
        }
    })
    return result;
}

const deleteHighLight = async (id: string) => {
    const result = await prisma.highLight.delete({
        where: {
            id: id
        }
    })
    return result;
}




export const highLightService = {
    createHighLight,
    updateHighLight,
    getAllHighLight,
    getSingleHighLight,
    deleteHighLight,
};