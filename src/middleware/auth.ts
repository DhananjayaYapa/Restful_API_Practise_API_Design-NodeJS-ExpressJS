import type { Request, Response, NextFunction } from 'express'
import { verifyToken, type JwtPayload } from '../utils/jwt.ts'

export interface AuthRequest extends Request {
    user?: JwtPayload
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        const decoded = await verifyToken(token)
        req.user = decoded
        console.log(decoded)
        next()
    } catch (error) {
        console.error('Authentication error:', error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}