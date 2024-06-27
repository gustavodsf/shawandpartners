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
 *         description: A list of matching records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Query parameter is required
 *       500:
 *         description: No matching data found or an error occurred
 */
router.get('/', (req: Request, res: Response) => {
  const query = req.query.q as string
  const csvData = getCsvData()

  if (!query) {
    // Return all data if no query parameter is provided
    return res.status(200).json({ data: csvData })
  }

  const filteredData = csvData.filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(query.toLowerCase()),
    )
  })

  if (filteredData.length === 0) {
    // Return 500 status code if no matches are found
    return res.status(500).json({ message: 'No matching data found' })
  }

  res.status(200).json({ data: filteredData })
})

export default router
