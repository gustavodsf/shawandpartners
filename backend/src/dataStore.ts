// src/dataStore.ts
export type UserDTO = {
  name: string
  city: string
  country: string
  favorite_sport: string
}

let csvData: UserDTO[] = []

export const setCsvData = (data: UserDTO[]) => {
  csvData = data
}

export const getCsvData = () => {
  return csvData
}
