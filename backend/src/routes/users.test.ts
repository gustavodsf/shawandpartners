// src/routes/users.test.ts
import request from 'supertest'
import express from 'express'
import router from './users'
import { getCsvData } from '../dataStore'

jest.mock('../dataStore')

const app = express()
app.use(express.json())
app.use('/api/users', router)

describe('GET /api/users', () => {
  it('should return 500 if query parameter is missing', async () => {
    const response = await request(app).get('/api/users')
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Query parameter is missing' })
  })

  it('should return 200 and filtered results if query parameter is provided', async () => {
    const mockData = [
      { name: 'John Doe', city: 'New York', country: 'USA' },
      { name: 'Jane Smith', city: 'Los Angeles', country: 'USA' },
    ]

    ;(getCsvData as jest.Mock).mockReturnValue(mockData)

    const response = await request(app).get('/api/users?q=john')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      data: [{ name: 'John Doe', city: 'New York', country: 'USA' }],
    })
  })

  it('should return 200 and empty array if no match is found', async () => {
    const mockData = [
      { name: 'John Doe', city: 'New York', country: 'USA' },
      { name: 'Jane Smith', city: 'Los Angeles', country: 'USA' },
    ]

    ;(getCsvData as jest.Mock).mockReturnValue(mockData)

    const response = await request(app).get('/api/users?q=notfound')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ data: [] })
  })
})
