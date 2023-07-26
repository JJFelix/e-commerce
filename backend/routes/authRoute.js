import express from 'express'
import { blockUser, deleteUser, getUser, getUsers, handleRefreshToken, login, register, unBlockUser, updateUser } from '../controllers/userController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'

const authRouter = express.Router()
// C
authRouter.post('/register', register)
authRouter.post('/login', login)
// R
authRouter.get('/',authMiddleware, isAdmin, getUsers)
authRouter.get('/refresh', handleRefreshToken)
authRouter.get('/:id', authMiddleware, getUser)
// U
authRouter.put('/update', authMiddleware, updateUser)
authRouter.put('/block/:id', authMiddleware, isAdmin, blockUser)
authRouter.put('/unblock/:id', authMiddleware, isAdmin, unBlockUser)
// D
authRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteUser)


export default authRouter