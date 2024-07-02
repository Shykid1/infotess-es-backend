const authRouter = require("express").Router();
const {
  protect,
  admin,
  superAuthorizer,
} = require("../middlewares/auth.middleware");
const {
  createSuperAdmin,
  createAdmin,
  createVoter,
  login,
  voterLogin,
} = require("../controllers/auth.controller");

// Create a new SuperAdmin
authRouter.post("/superadmin", createSuperAdmin);

// Create a new Admin
authRouter.post("/admin", protect, superAuthorizer, createAdmin);

// Create a new Voter
authRouter.post("/voter", protect, createVoter);

// Login
authRouter.post("/login", login);

// Voter Login
authRouter.post("/voter/login", voterLogin);

module.exports = authRouter;
