// routes/admin.routes.js
const express = require("express");
const adminController = require("../controllers/admin.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/admins", authenticate, adminController.createAdmin);
router.get("/admins", authenticate, adminController.getAdmins);
router.patch("/admins/:id", authenticate, adminController.updateAdmin);
router.delete("/admins/:id", authenticate, adminController.deleteAdmin);

module.exports = router;
