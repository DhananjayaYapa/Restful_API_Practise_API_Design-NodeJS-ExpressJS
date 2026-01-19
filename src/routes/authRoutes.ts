import { Router } from 'express'
import { register, signIn } from '../controllers/authController.ts'
import { validateBody } from '../middleware/validation.ts'
import { z } from 'zod'
import { insertUserSchema } from '../db/schema.ts'

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

const router = Router()

router.post('/sign-in', validateBody(loginSchema), signIn)

router.post('/register', validateBody(insertUserSchema), register)

export default router
