import express from "express"
import { createCategory, deleteCategory, getCategory, getCategorys, updateCategory } from "../controllers/productCategoryController.js"
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'

const productCategoryRouter = express.Router()

// C
productCategoryRouter.post('/create', authMiddleware, isAdmin, createCategory)

// R
productCategoryRouter.get('/', authMiddleware, getCategorys )
productCategoryRouter.get('/:id', authMiddleware, getCategory )

// U
productCategoryRouter.put('/update/:id', authMiddleware, isAdmin, updateCategory)

// D
productCategoryRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteCategory)


export default productCategoryRouter