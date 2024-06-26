import express, { Request, Response } from 'express'
import { getCsvData } from '../dataStore'

const router = express.Router()

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Search through the loaded CSV data
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: The search term
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred
 */
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
