import express from 'express'
import { 
    blockUser, deleteUser, forgotPasswordToken, getUser, getUsers, 
    handleRefreshToken, login, logout, register, resetPassword, 
    resetPasswordToken, unBlockUser, updateUser 
} from '../controllers/userController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'

const authRouter = express.Router()
// C
authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/forgotPassword', authMiddleware, forgotPasswordToken)
// R
authRouter.get('/',authMiddleware, isAdmin, getUsers)
authRouter.get('/refresh', handleRefreshToken)
authRouter.get('/logout', logout)
authRouter.get('/:id', authMiddleware, getUser)
// U
authRouter.put('/update', authMiddleware, updateUser)
authRouter.put('/block/:id', authMiddleware, isAdmin, blockUser)
authRouter.put('/unblock/:id', authMiddleware, isAdmin, unBlockUser)
authRouter.put('/resetPasswordToken', authMiddleware, resetPasswordToken)
authRouter.put('/resetPassword/:token', resetPassword)
// D
authRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteUser)





export default authRouter