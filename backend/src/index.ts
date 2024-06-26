import express from 'express'
import fileRoutes from './routes/files'
import userRoutes from './routes/users'

import cors from 'cors'

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
)

app.use('/api/files', fileRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
