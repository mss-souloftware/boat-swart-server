import jwt from 'jsonwebtoken'
import { badRequestResponse, unauthorizedResponse } from 'generic-response'

import prisma from '../config/database.config'

import type { Response, NextFunction } from 'express'
import type { AuthRequest } from '../interfaces/auth-request'
import config from '../config/config'

interface DecodedUser {
  userId: string
  role: 'ADMIN' | 'CAPTAIN'
}

const authRequired = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token = req.headers.authorization

  if (token === undefined) {
    const response = badRequestResponse('Authorization Token not provided.')
    res.status(response.status.code).json(response)
    return
  }

  if (token.split(' ')[0] !== 'Bearer') {
    const response = badRequestResponse('Invalid token format.')
    res.status(response.status.code).json(response)
    return
  }

  token = token.split(' ')[1]

  try {
    const decodedUser = jwt.verify(token, config.JWT_SECRET) as DecodedUser

    let user = null

    if (decodedUser.role === 'ADMIN') {
      user = await prisma.admins.findUnique({ where: { id: decodedUser.userId } })
    } else if (decodedUser.role === 'CAPTAIN') {
      user = await prisma.captains.findUnique({ where: { id: decodedUser.userId } })
    }

    if (user === null) {
      const response = unauthorizedResponse('Invalid token.')
      res.status(response.status.code).json(response)
      return
    }

    req.user = {
      userId: user.id,
      role: decodedUser.role
    }

    next()
  } catch (err) {
    const response = unauthorizedResponse('Invalid token.')
    res.status(response.status.code).json(response)
  }
}

export default authRequired
