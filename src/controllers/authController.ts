import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt.ts'
import { db } from '../db/connection.ts'
import { users } from '../db/schema.ts'
import { comparePassword } from '../utils/passwords.ts'
import { eq } from 'drizzle-orm'

export const register = async (req: Request, res: Response) => {
    try {
        const { email, username, password, firstName, lastName } = req.body

        // Hash password with configurable rounds
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12')
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Create user in database
        const [newUser] = await db
            .insert(users)
            .values({
                email,
                username,
                password: hashedPassword,  // Store hash, not plain text!
                firstName,
                lastName,
            })
            .returning({
                id: users.id,
                email: users.email,
                username: users.username,
                firstName: users.firstName,
                lastName: users.lastName,
                createdAt: users.createdAt,
            })

        // Generate JWT for auto-login
        const token = await generateToken({
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
        })

        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
            token,  // User is logged in immediately
        })
    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({ error: 'Failed to create user' })
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // Find user by email
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        })

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Compare password
        const isPasswordValid = await comparePassword(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Generate JWT for auto-login
        const token = await generateToken({
            id: user.id,
            email: user.email,
            username: user.username,
        })

        res.status(200).json({
            message: 'User signed in successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
            },
            token,  // User is logged in immediately
        }).status(201)
    } catch (error) {
        console.error('Sign-in error:', error)
        res.status(500).json({ error: 'Failed to sign in' })
    }
}