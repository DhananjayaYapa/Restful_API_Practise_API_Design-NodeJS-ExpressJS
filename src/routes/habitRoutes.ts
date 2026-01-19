import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.ts'
import z from 'zod'
import { authenticate } from '../middleware/auth.ts'

const router = Router()
const createHabitSchema = z.object({
  name: z.string(),
})
const completedParamsSchema = z.object({
  id: z.string().max(3),
})

router.use(authenticate)
router.get('/', (req, res) => {
  res.json({ message: 'Get all posts' })
})

router.get('/:id', validateParams(completedParamsSchema), (req, res) => {
  res.json({ message: 'Get one habit' })
})

router.post('/', validateBody(createHabitSchema), (req, res) => {
  res.status(201).json({ message: 'Habit created' })
})

router.post(
  '/:id/complete',
  validateParams(completedParamsSchema),
  validateBody(createHabitSchema),
  (req, res) => {
    res.status(201).json({ message: 'Habit completed' })
  },
)

router.delete('/:id', (req, res) => {
  res.json({ message: 'Habit is deleted' })
})

export default router
