const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

router.get("/", authMiddleware, productController.getProducts);
router.post("/", authMiddleware, productController.createProduct);

module.exports = router;