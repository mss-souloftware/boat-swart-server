import {
  serverErrorResponse,
  okResponse,
  badRequestResponse,
  createSuccessResponse,
  notFoundResponse
} from 'generic-response'

import prisma from '../../config/database.config'

import type { Response } from 'express'
import type { AuthRequest } from '../../interfaces/auth-request'

interface IGetSingleCaptainParams {
  captainId: string
}

interface ICreateCaptainBody {
  fullName: string
  phone: string
  email: string
  password: string
  city: string
  country: string
}

interface IDeleteCaptainParams {
  captainId: string
}

const getAllCaptain = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const captains = await prisma.captains.findMany()

    const response = okResponse({ captains })
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

const getSingleCaptain = async (
  req: AuthRequest<IGetSingleCaptainParams>,
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

    const response = okResponse({ captain })
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

const createCaptain = async (
  req: AuthRequest<unknown, unknown, ICreateCaptainBody>,
  res: Response
): Promise<Response> => {
  const data = req.body

  try {
    const existingEmail = await prisma.captains.findUnique({
      where: { email: data.email }
    })

    if (existingEmail != null) {
      const response = badRequestResponse('email already exists')
      return res.status(response.status.code).json(response)
    }

    const captain = await prisma.captains.create({
      data: { ...data }
    })

    const response = createSuccessResponse({ captain })
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

const deleteCaptain = async (
  req: AuthRequest<IDeleteCaptainParams>,
  res: Response
): Promise<Response> => {
  const captainId = req.params.captainId

  try {
    const existingCaptain = await prisma.captains.findUnique({
      where: { id: captainId }
    })

    if (existingCaptain === null) {
      const response = notFoundResponse('captain not found')
      return res.status(response.status.code).json(response)
    }

    const captain = await prisma.captains.delete({
      where: { id: captainId }
    })

    const response = okResponse({ captain })
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
  getAllCaptain,
  getSingleCaptain,
  createCaptain,
  deleteCaptain
}
