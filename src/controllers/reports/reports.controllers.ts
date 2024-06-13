import { serverErrorResponse, okResponse } from 'generic-response'

import prisma from '../../config/database.config'

import type { Response } from 'express'
import type { AuthRequest } from '../../interfaces/auth-request'

const getReport = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const totalNumberOfBoats = await prisma.boats.count()
    const totalNumberOfCaptains = await prisma.captains.count()

    // total boats category wise
    const totalNumberOfBoatsInCategoryA = await prisma.boats.count({
      where: { category: 'A' }
    })

    const totalNumberOfBoatsInCategoryB = await prisma.boats.count({
      where: { category: 'B' }
    })

    const totalNumberOfBoatsInCategoryC = await prisma.boats.count({
      where: { category: 'C' }
    })

    const totalNumberOfBoatsInCategoryD = await prisma.boats.count({
      where: { category: 'D' }
    })

    const report = {
      totalNumberOfCaptains,
      totalNumberOfBoats,
      totalBoatsCategoryWise: {
        A: totalNumberOfBoatsInCategoryA,
        B: totalNumberOfBoatsInCategoryB,
        C: totalNumberOfBoatsInCategoryC,
        D: totalNumberOfBoatsInCategoryD
      }
    }

    const response = okResponse({ report })
    return res.status(response.status.code).json(response)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      const response = serverErrorResponse(error.message)
      return res.status(response.status.code).json(response)
    } else {
      const response = serverErrorResponse('An unexpected error occurred')
      return res.status(response.status.code).json(response)
    }
  }
}

export default {
  getReport
}
