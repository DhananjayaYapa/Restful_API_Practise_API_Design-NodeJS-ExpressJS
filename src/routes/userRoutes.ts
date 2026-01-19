import { Router } from 'express'
import { authenticate } from '../middleware/auth.ts'

const router = Router()
router.use(authenticate)
router.get('/', (req, res) => {
  res.json({ message: 'Get all userss' })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'Get one user' })
})

router.post('/', (req, res) => {
  res.json({ message: 'user created' }).status(201)
})

router.post('/:id/complete', (req, res) => {
  res.json({ message: 'user completed' }).status(201)
})

router.put('/:id', (req, res) => {
  res.json({ message: 'User updated' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'user is deleted' })
})

export default router
