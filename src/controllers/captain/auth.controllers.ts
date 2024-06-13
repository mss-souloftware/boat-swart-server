import { serverErrorResponse, unauthorizedResponse, okResponse } from 'generic-response'
import jwt from 'jsonwebtoken'

import config from '../../config/config'
import prisma from '../../config/database.config'

import type { Response } from 'express'
import type { AuthRequest } from '../../interfaces/auth-request'

interface ILoginBody {
  email: string
  password: string
}

const login = async (
  req: AuthRequest<unknown, unknown, ILoginBody>,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body

  try {
    const user = await prisma.captains.findUnique({ where: { email } })

    if (user === null) {
      const response = unauthorizedResponse('Incorrect email or password.')
      return res.status(response.status.code).json(response)
    }

    if (user.password !== password) {
      const response = unauthorizedResponse('Incorrect email or password.')
      return res.status(response.status.code).json(response)
    }

    const payload = {
      userId: user.id,
      role: 'CAPTAIN'
    }

    const token = jwt.sign(payload, config.JWT_SECRET)

    const response = okResponse({ token, user: payload }, 'Login Success.')
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
  login
}
