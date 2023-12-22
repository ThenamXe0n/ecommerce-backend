const express = require("express");
const {createProduct, fetchAllProducts,fetchProductsById, updateProductsById} = require('../controllers/Product');
const router = express.Router();
//  /products is already added in base path
router.post('/', createProduct)
router.get('/',fetchAllProducts)
router.get('/:id',fetchProductsById)
router.patch('/:id',updateProductsById)

module.exports = router;