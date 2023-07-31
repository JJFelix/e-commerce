import express from 'express'

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
import { createCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from '../controllers/couponController.js'

const couponRouter = express.Router()

// C
couponRouter.post('/create', authMiddleware, isAdmin, createCoupon)

// R
couponRouter.get('/', authMiddleware, isAdmin, getCoupons)
couponRouter.get('/:id', authMiddleware, getCoupon)

// U 
couponRouter.put('/update/:id', authMiddleware, isAdmin, updateCoupon)

// D
couponRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteCoupon)

export default couponRouter