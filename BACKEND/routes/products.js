const express = require('express')
const router = express.Router()

const {
	getAllProducts,
	createProduct,
	getProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/products')
const { uploadProductImage } = require('../controllers/uploadsController')

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)
router.route('/uploads').post(uploadProductImage)

module.exports = router
