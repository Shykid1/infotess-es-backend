const authRouter = require("express").Router();
const { protect, admin } = require("../middlewares/auth.middleware");
const {
  createSuperAdmin,
  createAdmin,
  createVoter,
  login,
} = require("../controllers/auth.controller");

// Create a new SuperAdmin
authRouter.post("/superadmin", protect, admin, createSuperAdmin);

// Create a new Admin
authRouter.post("/admin", protect, admin, createAdmin);

// Create a new Voter
authRouter.post("/voter", protect, admin, createVoter);

// Login
authRouter.post("/login", login);

module.exports = routes;
