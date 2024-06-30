const electionRouter = require("express").Router();
const { protect, admin } = require("../middlewares/auth.middleware");
const {
  createElection,
  getAllElections,
  getElectionById,
  updateElection,
  deleteElection,
} = require("../controllers/election.controller");

// Create a new Election
electionRouter.post("/", protect, admin, createElection);

// Get all Elections
electionRouter.get("/", protect, admin, getAllElections);

// Get an Election by ID
electionRouter.get("/:id", protect, admin, getElectionById);

// Update an Election
electionRouter.put("/:id", protect, admin, updateElection);

// Delete an Election
electionRouter.delete("/:id", protect, admin, deleteElection);

module.exports = electionRouter;
