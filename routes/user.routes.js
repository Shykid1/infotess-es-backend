// routes/user.routes.js
const express = require("express");
const userController = require("../controllers/user.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", authenticate, userController.logout);
router.post("/logoutAll", authenticate, userController.logoutAll);

module.exports = router;
