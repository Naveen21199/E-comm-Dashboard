const express = require('express')
const { addProductController, getProductsController, deleteProductController, getProductController, updateProductController, searchController } = require('../controller/productController')
const { verifyToken } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/add-product', verifyToken, addProductController)
router.get('/products', verifyToken, getProductsController)
router.delete('/delete/:id', verifyToken, deleteProductController)
router.put('/update/:id', verifyToken, updateProductController)
router.get('/getProduct/:id', verifyToken, getProductController)
router.get('/search/:key', verifyToken, searchController)

module.exports = router