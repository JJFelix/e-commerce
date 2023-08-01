import express from 'express'
import { 
    applyCoupon,
    blockUser, createOrder, deleteUser, emptyCart, forgotPasswordToken, getOrders, getUser, getUserCart, getUsers, 
    getWishlist, 
    handleRefreshToken, login, loginAdmin, logout, register, resetPassword, 
    resetPasswordToken, unBlockUser, updateOrderStatus, updateUser, userCart 
} from '../controllers/userController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'

const authRouter = express.Router()
// C
authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/login/admin/', loginAdmin)
authRouter.post('/forgotPassword', authMiddleware, forgotPasswordToken)
authRouter.post('/cart', authMiddleware, userCart)
authRouter.post('/cart/applyCoupon', authMiddleware, applyCoupon)
authRouter.post('/cart/cashOrder', authMiddleware, createOrder)

// R
authRouter.get('/',authMiddleware, isAdmin, getUsers)
authRouter.get('/refresh', handleRefreshToken)
authRouter.get('/logout', logout)
authRouter.get('/wishlist', authMiddleware, getWishlist)
authRouter.get('/cart', authMiddleware, getUserCart)
authRouter.get('/cart/orders', authMiddleware, getOrders)
authRouter.get('/:id', authMiddleware, getUser)

// U
authRouter.put('/update', authMiddleware, updateUser)
authRouter.put('/block/:id', authMiddleware, isAdmin, blockUser)
authRouter.put('/unblock/:id', authMiddleware, isAdmin, unBlockUser)
authRouter.put('/resetPasswordToken', authMiddleware, resetPasswordToken)
authRouter.put('/resetPassword/:token', resetPassword)
authRouter.put('/updateOrderStatus/:id', authMiddleware, isAdmin, updateOrderStatus)

// D
authRouter.delete('/emptyCart', authMiddleware, emptyCart)
authRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteUser)





export default authRouter