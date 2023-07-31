import express from 'express'
import { 
    createBlog, deleteBlog, dislikeBlog, getBlog, 
    getBlogs, likeBlog, updateBlog, uploadImages 
} from '../controllers/blogController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
import { blogImgResize, uploadPhoto } from '../middlewares/uploadImages.js'

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
blogRouter.put('/upload/:id', authMiddleware, isAdmin, 
    uploadPhoto.array('images',3), blogImgResize, uploadImages)

// D
blogRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteBlog)


export default blogRouter