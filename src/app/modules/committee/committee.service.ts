import AppError from "../../errorHalpers/AppError.js"
import { IQueryParams } from "../../interface/query.interface.js"
import { prisma } from "../../lib/prisma.js"
import { QueryBuilder } from "../../utils/QueryBuilder.js"
import { committeeFilterableFields, committeeSearchableFields } from "./committee.constent.js"
import { ICreateCommittee } from "./committee.type.js"

const createCommittee = async (payload: ICreateCommittee) => {
    try {
        const result = await prisma.committee.create({
            data: {
                payload
            }
        })
        return result
    } catch (error) {
        throw new AppError(500, "Failed to create committee")
    }

}


const getAllCommittee = async (query: IQueryParams) => {
     const committeeQuery = new QueryBuilder(prisma.committee, query, {
            searchableFields: committeeSearchableFields,
            filterableFields: committeeFilterableFields
        })
            .search()
            .filter()
            .paginate()
            .sort()
            .fields();
    
        const result = await committeeQuery.execute();
        return result;
}


const getSingleCommittee = async (id: string) => {
    try {
        const result = await prisma.committee.findUnique({
            where: {
                id
            }
        })
        return result
    } catch (error) {
        throw new AppError(500, "Failed to get committee")
    }
}

const updateCommittee = async (id: string, payload: ICreateCommittee) => {
    try {
        const result = await prisma.committee.update({
            where: {
                id
            },
            data: {
                payload
            }
        })
        return result
    } catch (error) {
        throw new AppError(500, "Failed to update committee")
    }
}

const deleteCommittee = async (id: string) => {
    try {
        const result = await prisma.committee.delete({
            where: {
                id
            }
        })
        return result
    } catch (error) {
        throw new AppError(500, "Failed to delete committee")
    }
}


export const committeeService = {
    createCommittee,
    getAllCommittee,
    getSingleCommittee,
    updateCommittee,
    deleteCommittee
}
