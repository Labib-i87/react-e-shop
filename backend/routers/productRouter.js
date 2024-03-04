const router = require("express").Router();

const productController = require("../controllers/products_controller");

const auth = require("../middleware/auth");
const fileUpload = require("../middleware/file-upload");

router.post(
  "/new",
  auth,
  fileUpload.single("imageUrl"),
  productController.createProduct
);
router.get("/", productController.getProducts);
router.get("/:pid", productController.getProductById);
router.get("/user/:userId", productController.getProductsByUserId);

module.exports = router;
