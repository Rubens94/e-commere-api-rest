const { Router } = require('express');

const {
    verifyTokenAndAdmin
} = require('../middleware/verifyToken');

const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProducts
} = require('../controllers/product');

const router = Router();

//CREATE
router.post("/", verifyTokenAndAdmin, createProduct);
  
//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//GET PRODUCT
router.get("/find/:id", getProduct);

//GET ALL PRODUCTS
router.get("/", getProducts);

module.exports = router;