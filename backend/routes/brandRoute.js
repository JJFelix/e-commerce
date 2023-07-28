import express from "express"
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from "../controllers/brandController.js"
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'

const brandRouter = express.Router()

// C
brandRouter.post('/create', authMiddleware, isAdmin, createBrand)

// R
brandRouter.get('/', authMiddleware,getBrands )
brandRouter.get('/:id', authMiddleware, getBrand )
// U
brandRouter.put('/update/:id', authMiddleware, isAdmin, updateBrand)

// D
brandRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteBrand)


export default brandRouter