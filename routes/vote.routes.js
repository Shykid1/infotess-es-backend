const voteRouter = require("express").Router();
const { protect, admin } = require("../middlewares/auth.middleware");
const {
  createVote,
  getVotes,
  getVoteById,
  updateVote,
  deleteVote,
} = require("../controllers/vote.controller");

// Create a new Vote
voteRouter.post("/", protect, admin, createVote);

// Get all Votes
voteRouter.get("/", protect, admin, getVotes);

// Get a Vote by ID
voteRouter.get("/:id", protect, admin, getVoteById);

// Update a Vote
// voteRouter.put('/:id', protect, admin, updateVote);

// Delete a Vote
// voteRouter.delete('/:id', protect, admin, deleteVote);

module.exports = voteRouter;
