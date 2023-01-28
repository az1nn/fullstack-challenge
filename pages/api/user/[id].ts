import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '../../../interfaces'

const prisma = new PrismaClient()

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const query = _req.query
  const {first_name, last_name, participation} = _req.body
  const { id } = query
  const NumId = parseInt((id as string))
  const numP = parseInt(participation)
  if(_req.method === "GET") {
      const user = await prisma.user.findUnique({
        where: {
          id: NumId,
        },
      })
      if(!!user) res.status(200).json(user)
      if(user === null) res.status(404).json({ message: "Not Found" })
  }
  if(_req.method === "POST") {
    try {
      await prisma.user.update({
        where: {
          id: NumId,
        },
        data: {
          first_name,
          last_name,
          participation: numP 
        }
      })
      res.status(200).json({ message: 'User Updated' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error })
    }
  }
}