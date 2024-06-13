import {
  serverErrorResponse,
  unauthorizedResponse,
  okResponse,
  updateSuccessResponse,
  badRequestResponse,
  notFoundResponse
} from 'generic-response'

import prisma from '../../config/database.config'

import type { Response } from 'express'
import type { AuthRequest } from '../../interfaces/auth-request'

interface IChangePasswordBody {
  oldPassword?: string
  newPassword?: string
}

interface IUpdateMyProfile {
  fullName: string
  phone: string
  city: string
  country: string
}

const getMyProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  const user = req.user

  if (user === undefined) {
    const response = unauthorizedResponse()
    return res.status(response.status.code).json(response)
  }

  const { userId } = user

  try {
    const user = await prisma.captains.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        city: true,
        country: true,
        createdAt: true,
        updatedAt: true
      }
    })

    const response = okResponse({ user })
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

const changePassword = async (
  req: AuthRequest<unknown, unknown, IChangePasswordBody>,
  res: Response
): Promise<Response> => {
  const { oldPassword, newPassword } = req.body
  const user = req.user

  if (user === undefined) {
    const response = unauthorizedResponse()
    return res.status(response.status.code).json(response)
  }

  const { userId } = user

  try {
    const user = await prisma.captains.findUnique({
      where: { id: userId }
    })

    if (user === null) {
      const response = notFoundResponse('user not found')
      return res.status(response.status.code).json(response)
    }

    if (user.password !== oldPassword) {
      const response = badRequestResponse('incorrect password')
      return res.status(response.status.code).json(response)
    }

    await prisma.captains.update({ where: { id: userId }, data: { password: newPassword } })

    const response = updateSuccessResponse()
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

const updateMyProfile = async (
  req: AuthRequest<unknown, unknown, IUpdateMyProfile>,
  res: Response
): Promise<Response> => {
  const data = req.body
  const user = req.user

  if (user === undefined) {
    const response = unauthorizedResponse()
    return res.status(response.status.code).json(response)
  }

  const { userId } = user

  try {
    const user = await prisma.captains.update({ where: { id: userId }, data })

    const response = updateSuccessResponse({ user })
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
  getMyProfile,
  changePassword,
  updateMyProfile
}
