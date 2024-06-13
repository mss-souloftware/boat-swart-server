import { serverErrorResponse, okResponse, notFoundResponse } from 'generic-response'

import prisma from '../../config/database.config'

import type { Response } from 'express'
import type { AuthRequest } from '../../interfaces/auth-request'

interface IGetCaptainBoatParams {
  captainId: string
}

const getCaptainBoat = async (
  req: AuthRequest<IGetCaptainBoatParams>,
  res: Response
): Promise<Response> => {
  const captainId = req.params.captainId

  try {
    const captain = await prisma.captains.findUnique({
      where: { id: captainId }
    })

    if (captain === null) {
      const response = notFoundResponse('captain not found')
      return res.status(response.status.code).json(response)
    }

    const boat = await prisma.boats.findFirst({
      where: { captainId },
      include: {
        OBM: true,
        Cement: true,
        BlendedCement: true,
        Safra: true,
        Diesel: true,
        FreshWater: true,
        WBM: true,
        Brine: true
      }
    })

    const response = okResponse({ boat })
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
  getCaptainBoat
}
