const router = require("express").Router();
const cartController = require("../controllers/cart_controller");

const auth = require("../middleware/auth");

router.post("/:pid", auth, cartController.addToCart);
router.get("/", auth, cartController.getCart);
router.delete("/:pid", auth, cartController.removeFromCart);

module.exports = router;
