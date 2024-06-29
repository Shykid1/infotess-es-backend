const candidateRouter = require("express").Router();
const { protect, admin } = require("../middlewares/auth.middleware");
const {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidate.controller");

// Create a new Candidate
candidateRouter.post("/", protect, admin, createCandidate);

// Get all Candidates
candidateRouter.get("/", protect, admin, getCandidates);

// Get a Candidate by ID
candidateRouter.get("/:id", protect, admin, getCandidateById);

// Update a Candidate
candidateRouter.put("/:id", protect, admin, updateCandidate);

// Delete a Candidate
candidateRouter.delete("/:id", protect, admin, deleteCandidate);

module.exports = candidateRouter;
