import express from 'express'
import authRoutes from './routes/authRoutes.ts'
import habitRoutes from './routes/habitRoutes.ts'
import userRoutes from './routes/userRoutes.ts'

const app = express()

app.post('/cake', (req, res) => {
  res.send('Get one user').status(201)
})
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/habits', habitRoutes)

export { app }

export default app
