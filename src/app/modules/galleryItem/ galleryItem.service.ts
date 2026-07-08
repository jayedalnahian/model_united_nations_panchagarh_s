import { prisma } from "../../lib/prisma.js";
import { createGalleryItemType } from "./galleryItem.type.js"


const createGalleryItem = async (payload: createGalleryItemType) => {
    const result = await prisma.galleryItem.create({
        data: payload
    })
    return result;
}

const getAllGalleryItems = async () => {
    const result = await prisma.galleryItem.findMany();
    return result;
}

const getGalleryItemById = async (id: string) => {
    const result = await prisma.galleryItem.findUnique({
        where: {
            id: id
        }
    })
    return result;
}

const updateGalleryItemById = async (id: string, payload: createGalleryItemType) => {
    const result = await prisma.galleryItem.update({
        where: {
            id: id
        },
        data: payload
    })
    return result;
}

const deleteGalleryItemById = async (id: string) => {
    const result = await prisma.galleryItem.delete({
        where: {
            id: id
        }
    })
    return result;
}












export const galleryItemService = {
    createGalleryItem,
    getAllGalleryItems,
    getGalleryItemById,
    updateGalleryItemById,
    deleteGalleryItemById
}