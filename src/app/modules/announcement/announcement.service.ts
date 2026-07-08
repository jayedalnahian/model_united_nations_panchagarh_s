import status from "http-status"
import AppError from "../../errorHalpers/AppError.js"
import { IQueryParams } from "../../interface/query.interface.js"
import { prisma } from "../../lib/prisma.js"
import { QueryBuilder } from "../../utils/QueryBuilder.js"
import { announcementSearchableFields, announcemtntFilterableFields } from "./announcement.constent.js"
import { IAnnouncementPayload, IUpdateAnnouncementPayload } from "./announcement.type.js"





const createAnnouncement = async (payload: IAnnouncementPayload) => {
    const result = await prisma.announcement.create({
        data: payload
    })

    return result

}

const getAllAnnouncement = async (query: IQueryParams) => {
    const announcementQutery = new QueryBuilder(prisma.category, query, {
        searchableFields: announcementSearchableFields,
        filterableFields: announcemtntFilterableFields
    })
        .search()
        .filter()
        .paginate()
        .sort()
        .fields();

    const result = await announcementQutery.execute();
    return result;
}

const getSingleAnnouncement = async (id: string) => {



    const result = prisma.announcement.findFirst(
        {
            whare: {
                id,
            }
        }
    )

    if (!result) {
        throw new AppError(status.NOT_FOUND, "announcent not found")
    }

    return result
}


const updateAnnouncement = async (id: string, updatePayload: IUpdateAnnouncementPayload) => {

    const isExist = prisma.announcement.findFirst(
        {
            whare: {
                id,
            }
        }
    )

    if (!isExist) {
        throw new AppError(status.NOT_FOUND, "announcent not found")
    }




    const result = prisma.announcement.update({
        where: {
            id
        },
        body: {
            updatePayload
        }
    })

    return result
}


const deleteAnnouncement = async (id: string) => {

    const isExist = prisma.announcement.findFirst(
        {
            whare: {
                id,
            }
        }
    )

    if (!isExist) {
        throw new AppError(status.NOT_FOUND, "announcent not found")
    }
    const result = prisma.announcement.delete({
        where: {
            id
        }
    })

    return result
}





export const announcementService = {
    createAnnouncement,
    getAllAnnouncement,
    getSingleAnnouncement,
    updateAnnouncement,
    deleteAnnouncement

}