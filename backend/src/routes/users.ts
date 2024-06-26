import express, { Request, Response } from 'express'
import { getCsvData } from '../dataStore'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  const query = req.query.q as string
  if (!query) {
    return res.status(500).json({ message: 'Query parameter is missing' })
  }

  const results = getCsvData().filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(query.toLowerCase()),
    )
  })

  res.status(200).json({ data: results })
})

export default router
