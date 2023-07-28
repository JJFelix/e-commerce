import express from 'express'
import { 
    createBlog, deleteBlog, dislikeBlog, getBlog, 
    getBlogs, likeBlog, updateBlog 
} from '../controllers/blogController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'

const blogRouter = express.Router()

// C
blogRouter.post('/create', authMiddleware, isAdmin, createBlog)

// R
blogRouter.get('/', getBlogs)
blogRouter.get('/:id', getBlog)

//  U
blogRouter.put('/update/:id', authMiddleware, isAdmin, updateBlog)
blogRouter.put('/likeBlog', authMiddleware, likeBlog)
blogRouter.put('/dislikeBlog', authMiddleware, dislikeBlog)


// D
blogRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteBlog)


export default blogRouter