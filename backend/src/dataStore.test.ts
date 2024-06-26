import { setCsvData, getCsvData } from './dataStore'

describe('dataStore module', () => {
  beforeEach(() => {
    // Reset the CSV data before each test
    setCsvData([])
  })

  test('getCsvData should return an empty array initially', () => {
    const data = getCsvData()
    expect(data).toEqual([])
  })

  test('getCsvData should return the data set by setCsvData', () => {
    const sampleData = [
      {
        name: 'John Doe',
        city: 'New York',
        country: 'USA',
        favorite_sport: 'Basketball',
      },
      {
        name: 'Jane Smith',
        city: 'London',
        country: 'UK',
        favorite_sport: 'Football',
      },
    ]
    setCsvData(sampleData)
    const data = getCsvData()
    expect(data).toEqual(sampleData)
  })

  test('getCsvData should return updated data after multiple setCsvData calls', () => {
    const initialData = [
      {
        name: 'John Doe',
        city: 'New York',
        country: 'USA',
        favorite_sport: 'Basketball',
      },
    ]
    const updatedData = [
      {
        name: 'Jane Smith',
        city: 'London',
        country: 'UK',
        favorite_sport: 'Football',
      },
    ]
    setCsvData(initialData)
    setCsvData(updatedData)
    const data = getCsvData()
    expect(data).toEqual(updatedData)
  })
})
