import {
  serverErrorResponse,
  okResponse,
  updateSuccessResponse,
  badRequestResponse,
  notFoundResponse,
  deleteSuccessResponse,
  unauthorizedResponse
} from 'generic-response'

import prisma from '../../config/database.config'

import type { Response } from 'express'
import type { AuthRequest } from '../../interfaces/auth-request'

import type { BOAT_CATEGORY } from '@prisma/client'

interface IGetAllBoatsQuery {
  category?: 'A' | 'B' | 'C' | 'D'
}

interface IGetSingleBoatParams {
  boatId: string
}

interface ICreateBoatBody {
  name: string
  number: string
  category: BOAT_CATEGORY
  captainId: string
  currentLocation: string
  nextLocation: string
  operationType: string
  arrivalTime: Date
  departureTime: Date
  OBM: {
    opearionType: string
    manifested: boolean
    quantitySupplied: number
    remainingQuantity: number
  }
}

interface IUpdateBoatParams {
  boatId: string
}

interface IUpdateBoatBody {
  name?: string
  number?: string
  category?: 'A' | 'B' | 'C' | 'D'
  captainId?: string | null
  currentLocation?: string
  nextLocation?: string
  operationType?: string
  arrivalTime?: Date
  departureTime?: Date
  OBM: {
    opearionType: string
    manifested: boolean
    quantitySupplied: number
    remainingQuantity: number
  }
  Cement?: {
    quantitySupplied: number
    remainingQuantity: number
    manifested: boolean
    additionalInfo: string
  }
  BlendedCement?: {
    quantitySupplied: number
    remainingQuantity: number
    manifested: boolean
    additionalInfo: string
  }
  Safra?: {
    quantitySupplied: number
    remainingQuantity: number
    manifested: boolean
    additionalInfo: string
  }
  Diesel?: {
    quantitySupplied: number
    remainingQuantity: number
    manifested: boolean
    additionalInfo: string
  }
  FreshWater?: {
    quantitySupplied: number
    remainingQuantity: number
    manifested: boolean
    additionalInfo: string
  }
  WBM?: {
    quantitySupplied: number
    remainingQuantity: number
    manifested: boolean
    additionalInfo: string
  }
  Brine?: {
    quantitySupplied: number
    remainingQuantity: number
    manifested: boolean
    additionalInfo: string
  }
}

interface IDeleteBoatParams {
  boatId: string
}

interface IObject extends Record<string, any> {}

const extractNestedProperties = (obj: IObject): Partial<IObject> => {
  const nonNestedProperties: IObject = {}

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      nonNestedProperties[key] = obj[key]
    }
  })

  return nonNestedProperties
}

const extractNonNestedProperties = (obj: IObject): Partial<IObject> => {
  const nonNestedProperties: Partial<IObject> = {}

  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || key === 'OBM' || typeof obj[key] !== 'object') {
      nonNestedProperties[key] = obj[key]
    }
  })

  return nonNestedProperties
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TransformObject<T> = {
  [P in keyof T]: T[P] extends object ? { update: T[P] } : T[P]
}

const transformBoatUpdate = (input: Partial<IObject>): TransformObject<Partial<IObject>> => {
  const transformed = { ...input }

  for (const key in transformed) {
    if (Boolean(transformed[key]) && typeof transformed[key] === 'object') {
      transformed[key] = {
        update: transformed[key]
      }
    }
  }

  return transformed
}

const updateBoatProperties = async (
  boatId: string,
  data: Partial<IUpdateBoatBody>,
  type: 'nested' | 'non-nested'
): Promise<void> => {
  if (type === 'nested') {
    data = transformBoatUpdate(data)
  }

  if (type === 'non-nested') {
    data = transformBoatUpdate(data)
    if (data.captainId !== undefined && data.captainId !== null) {
      const captain = await prisma.captains.findUnique({
        where: { id: data.captainId },
        include: { Boat: true }
      })

      if (captain === null) {
        throw new Error('captain not found')
      }

      if (captain.Boat.length > 0) {
        throw new Error('captain has already one boat assigned')
      }

      const boat = await prisma.boats.findUnique({
        where: { id: boatId }
      })

      if (boat?.captainId !== null) {
        throw new Error('boat is already assigned to someone')
      }
    }
  }

  console.log('final', data)
  await prisma.boats.update({
    where: { id: boatId },
    // @ts-expect-error Unreachable code error
    data: { ...data }
  })
}

const getAllBoats = async (
  req: AuthRequest<unknown, unknown, unknown, IGetAllBoatsQuery>,
  res: Response
): Promise<Response> => {
  const { category } = req.query

  try {
    const boats = await prisma.boats.findMany({
      where: { category },
      include: {
        Captain: true
      }
    })

    const response = okResponse({ boats })
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

const getSingleBoats = async (
  req: AuthRequest<IGetSingleBoatParams>,
  res: Response
): Promise<Response> => {
  const baotId = req.params.boatId

  try {
    const boat = await prisma.boats.findUnique({
      where: { id: baotId },
      include: {
        Captain: true,
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

    if (boat === null) {
      const response = notFoundResponse('boat not found')
      return res.status(response.status.code).json(response)
    }

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

const createBoat = async (
  req: AuthRequest<unknown, unknown, ICreateBoatBody>,
  res: Response
): Promise<Response> => {
  const data = req.body

  try {
    if (data.captainId !== null) {
      const existingCaptain = await prisma.captains.findUnique({
        where: { id: data.captainId }
      })

      if (existingCaptain === null) {
        const response = notFoundResponse('Captain not found')
        return res.status(response.status.code).json(response)
      }

      const captainAssignedBoat = await prisma.boats.findFirst({
        where: { captainId: data.captainId }
      })

      if (captainAssignedBoat !== null) {
        const response = badRequestResponse(
          `Captain with id: ${data.captainId} already has a boat assigned.`
        )
        return res.status(response.status.code).json(response)
      }
    }

    const boat = await prisma.boats.create({
      data: {
        ...data,
        OBM: { create: { ...data.OBM } },
        Cement: { create: {} },
        BlendedCement: { create: {} },
        Safra: { create: {} },
        Diesel: { create: {} },
        FreshWater: { create: {} },
        WBM: { create: {} },
        Brine: { create: {} }
      }
    })

    const response = updateSuccessResponse({ boat })
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

const updateBoat = async (
  req: AuthRequest<IUpdateBoatParams, unknown, IUpdateBoatBody>,
  res: Response
): Promise<Response> => {
  const user = req.user
  const boatId = req.params.boatId
  const data = req.body

  try {
    const existingBoat = await prisma.boats.findUnique({
      where: { id: boatId }
    })

    if (existingBoat === null) {
      const response = notFoundResponse('boat not found')
      return res.status(response.status.code).json(response)
    }

    if (user?.role === 'CAPTAIN' && existingBoat.captainId !== user.userId) {
      const response = unauthorizedResponse('not your boat')
      return res.status(response.status.code).json(response)
    }

    if (user?.role === 'ADMIN') {
      const nonNestedProperties = extractNonNestedProperties(data)
      await updateBoatProperties(boatId, nonNestedProperties, 'non-nested')
    } else if (user?.role === 'CAPTAIN') {
      const nestedProperties = extractNestedProperties(data)
      await updateBoatProperties(boatId, nestedProperties, 'nested')
    }

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

const deleteBoat = async (
  req: AuthRequest<IDeleteBoatParams>,
  res: Response
): Promise<Response> => {
  const baotId = req.params.boatId

  try {
    const existingBoat = await prisma.boats.findUnique({
      where: { id: baotId }
    })

    if (existingBoat === null) {
      const response = notFoundResponse('boat not found')
      return res.status(response.status.code).json(response)
    }

    const boat = await prisma.boats.delete({
      where: { id: baotId }
    })

    const response = deleteSuccessResponse({ boat })
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
  getAllBoats,
  getSingleBoats,
  createBoat,
  updateBoat,
  deleteBoat
}
