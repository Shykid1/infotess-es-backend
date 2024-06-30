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
} = require("../controllers/auth.controller");

// Create a new SuperAdmin
authRouter.post("/superadmin", createSuperAdmin);

// Create a new Admin
authRouter.post("/admin", protect, superAuthorizer, createAdmin);

// Create a new Voter
authRouter.post("/voter", protect, admin, createVoter);

// Login
authRouter.post("/login", login);

module.exports = authRouter;
