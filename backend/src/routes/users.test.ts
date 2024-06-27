// src/routes/users.test.ts
import request from 'supertest'
import express from 'express'
import router from './users' // Adjust the path to your server file
import { getCsvData } from '../dataStore' // Adjust the path to your getCsvData function

jest.mock('../dataStore')

const app = express()
app.use(express.json())
app.use('/api/users', router)

const mockData = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Test User', email: 'test@example.com' },
]

;(getCsvData as jest.Mock).mockReturnValue(mockData)

describe('GET /api/users', () => {
  // Test for when no query parameter is provided
  it('should return all data when no query parameter is provided', async () => {
    const response = await request(app).get('/api/users')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data.length).toBe(mockData.length)
  })

  // Test for when a query parameter is provided and matches data
  it('should return matching data when a query parameter is provided', async () => {
    const response = await request(app).get('/api/users?q=test') // Adjust the query parameter to match your test data
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data.length).toBeGreaterThan(0)
  })

  // Test for when a query parameter is provided but no matching data is found
  it('should return 500 when no matching data is found', async () => {
    const response = await request(app).get('/api/users?q=nonexistent') // Adjust the query parameter to ensure no match
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', 'No matching data found')
  })

  // Test for when the query parameter is missing
  it('should return all data when the query parameter is missing', async () => {
    const response = await request(app).get('/api/users')
    expect(response.status).toBe(200) // Adjust this if you change the behavior for missing query parameter
    expect(response.body).toHaveProperty('data')
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data.length).toBe(mockData.length)
  })
})
