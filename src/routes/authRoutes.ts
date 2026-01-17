import { Router } from 'express'

const router = Router()

router.post('/sign-in', (req, res) => {
  res.status(201).json({ message: 'Sucefully signed in' })
})

router.post('register', (req, res) => {
  res.status(201).json({ message: 'User succefully registered' })
})

export default router
