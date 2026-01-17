import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Get all posts' })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'Get one habit' })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Habit created' })
})

router.post('/:id/complete', (req, res) => {
  res.status(201).json({ message: 'Habit completed' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'Habit is deleted' })
})

export default router
