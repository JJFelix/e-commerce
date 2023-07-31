import express from 'express'
import { 
    addProduct, addToWishlist, deleteProduct, 
    getProduct, getProducts, rating, updateProduct, uploadImages 
} from '../controllers/productController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
import { productImgResize, uploadPhoto } from '../middlewares/uploadImages.js'


const productRouter = express.Router()

// C
productRouter.post('/add', authMiddleware, isAdmin, addProduct)

// R
productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct )

// U
productRouter.put('/update/:id', authMiddleware, isAdmin, updateProduct)
productRouter.put('/wishlist', authMiddleware, addToWishlist)
productRouter.put('/rating', authMiddleware, rating)
productRouter.put('/upload/:id', authMiddleware, isAdmin, 
    uploadPhoto.array('images',10), productImgResize, uploadImages)
// D
productRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteProduct)


export default productRouter