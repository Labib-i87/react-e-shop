const router = require("express").Router();

const usersController = require("../controllers/users_controller");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.get("/logout", usersController.logout);

module.exports = router;
