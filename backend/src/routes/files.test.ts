/* eslint-disable @typescript-eslint/no-var-requires */
import request from 'supertest'
import express, { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import router from './files' // Adjust the path as necessary
import { setCsvData } from '../dataStore'

jest.mock('multer', () => {
  let shouldAttachFile = true

  const multer = () => ({
    single: () => {
      return (req: Request, res: Response, next: NextFunction) => {
        if (shouldAttachFile) {
          req.file = {
            fieldname: 'file',
            originalname: 'sample.csv',
            encoding: '7bit',
            mimetype: 'text/csv',
            size: 12345, // Replace with the actual file size
            destination: 'uploads/', // Replace with the actual destination path
            filename: 'sample.csv', // Replace with the actual filename
            path: 'uploads/sample.csv', // Replace with the actual file path
            buffer: Buffer.from('name,city,country\nJohn Doe,New York,USA\n'),
            stream: fs.createReadStream('uploads/sample.csv'), // Replace with the actual file stream
          }
        }
        return next()
      }
    },
  })
  multer.memoryStorage = () => jest.fn()
  multer.setShouldAttachFile = (value: boolean) => {
    shouldAttachFile = value
  }
  return multer
})

// Mock setCsvData
jest.mock('../dataStore', () => ({ setCsvData: jest.fn() }))

const app = express()
app.use(express.json())
app.use('/api/upload', router)

describe('POST /upload', () => {
  const mockFilePath = path.join(__dirname, '../../', 'sample.csv')
  const mockFile = Buffer.from(
    'name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball\n',
  )

  beforeEach(() => {
    fs.writeFileSync(mockFilePath, mockFile)
    jest
      .spyOn(fs, 'unlink')
      .mockImplementation((path, callback) => callback(null))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 500 if no file is uploaded', async () => {
    require('multer').setShouldAttachFile(false) // Ensure no file is attached
    const response = await request(app).post('/api/upload').send()
    expect(response.status).toBe(500)
    expect(response.body.message).toBe('No file uploaded')
  })

  it('should process the uploaded file and return 200', async () => {
    require('multer').setShouldAttachFile(true) // Ensure file is attached
    const response = await request(app)
      .post('/api/upload')
      .attach('file', mockFilePath) // Debugging statement

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('The file was uploaded successfully.')
    expect(setCsvData).toHaveBeenCalledWith([
      {
        name: 'John Doe',
        city: 'New York',
        country: 'USA',
        favorite_sport: 'Basketball',
      },
    ])
    expect(jest.spyOn(fs, 'unlink')).toHaveBeenCalledWith(
      mockFilePath,
      expect.any(Function),
    )
  })
})
