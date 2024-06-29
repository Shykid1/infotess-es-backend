const userRouter = require("express").Router();
const { protect, admin } = require("../middlewares/auth.middleware");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getSuperAdmins,
  getSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getVoters,
  getVoter,
  updateVoter,
  deleteVoter,
} = require("../controllers/auth.controller");

// Get all Users
userRouter.get("/", protect, admin, getUsers);

// Get User by id
userRouter.get("/:id", protect, admin, getUser);

// Update User by id
userRouter.put("/:id", protect, admin, updateUser);

// Delete User by id
userRouter.delete("/:id", protect, admin, deleteUser);

// Get all Super Admins
userRouter.get("/superadmins", protect, admin, getSuperAdmins);

// Get Super Admin by id
userRouter.get("/superadmins/:id", protect, admin, getSuperAdmin);

// Update Super Admin by id
userRouter.put("/superadmins/:id", protect, admin, updateSuperAdmin);

// Delete Super Admin by id
userRouter.delete("/superadmins/:id", protect, admin, deleteSuperAdmin);

// Get all Admins
userRouter.get("/admins", protect, admin, getAdmins);

// Get Admin by id
userRouter.get("/admins/:id", protect, admin, getAdmin);

// Update Admin by id
userRouter.put("/admins/:id", protect, admin, updateAdmin);

// Delete Admin by id
userRouter.delete("/admins/:id", protect, admin, deleteAdmin);

// Get all Voters
userRouter.get("/voters", protect, admin, getVoters);

// Get Voter by id
userRouter.get("/voters/:id", protect, admin, getVoter);

// Update Voter by id
userRouter.put("/voters/:id", protect, admin, updateVoter);

// Delete Voter by id
userRouter.delete("/voters/:id", protect, admin, deleteVoter);

module.exports = userRouter;
