import express from 'express'
import {
    register,
    login
} from '../controllers/authController.js'
import { validateLoginUser, validateRegisterUser } from '../middleware/validateMiddleware.js'


const router = express.Router()

router.post("/register", validateRegisterUser, register)

router.post("/login", validateLoginUser, login)

export default router