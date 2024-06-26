import express, { Request, Response } from 'express'
import multer from 'multer'
import csv from 'csv-parser'
import fs from 'fs'
import { setCsvData, UserDTO } from '../dataStore'
import path from 'path'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.post('/', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(500).json({ message: 'No file uploaded' })
  }

  const results: UserDTO[] = []

  const filePath = path.join(__dirname, req.file.path)
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // Ensure the data conforms to UserDTO type
      const user: UserDTO = {
        name: data.name,
        city: data.city,
        country: data.country,
        favorite_sport: data.favorite_sport,
      }
      results.push(user)
    })
    .on('end', () => {
      setCsvData(results)
      res.status(200).json({ message: 'The file was uploaded successfully.' })

      // Delete the file after processing
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${filePath}`, err)
        }
      })
    })
    .on('error', (error) => {
      console.log('Error', error)
      res.status(500).json({ message: error.message })

      // Delete the file in case of error
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${filePath}`, err)
        }
      })
    })
})

export default router
