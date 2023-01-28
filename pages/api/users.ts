import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '../../interfaces'

// Fake users data
const FakeUsers: User[] = [{ id: 1, first_name: "Alan", last_name: "Sá", participation: 20}, { id: 2, first_name: "Alan", last_name: "Sá", participation: 20}, { id: 3, first_name: "Alan", last_name: "Sá", participation: 20}]

const prisma = new PrismaClient()

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const {first_name, last_name, participation} = _req.body
  const numP = parseInt(participation)
  
  if(_req.method === "GET") {
    const dbUsers = await prisma.user.findMany()
    res.status(200).json(dbUsers)
  }
  if(_req.method === "POST") {
    try {
      await prisma.user.create({
        data: {
          first_name,
          last_name,
          participation: numP
        }
      })
      res.status(200).json({ message: 'New User Added' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error })
    }
  }
}
