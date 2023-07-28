import express from "express"
import { createCategory, deleteCategory, getCategory, getCategorys, updateCategory } from "../controllers/blogCategoryController.js"
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'

const blogCategoryRouter = express.Router()

// C
blogCategoryRouter.post('/create', authMiddleware, isAdmin, createCategory)

// R
blogCategoryRouter.get('/', authMiddleware,getCategorys )
blogCategoryRouter.get('/:id', authMiddleware, getCategory )
// U
blogCategoryRouter.put('/update/:id', authMiddleware, isAdmin, updateCategory)

// D
blogCategoryRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteCategory)


export default blogCategoryRouter