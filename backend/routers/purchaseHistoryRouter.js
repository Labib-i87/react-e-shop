const router = require("express").Router();
const purchaseHistoryController = require("../controllers/purchaseHistory_controller");
const auth = require("../middleware/auth");

router.post("/", auth, purchaseHistoryController.updatePurchaseHistory);

module.exports = router;
