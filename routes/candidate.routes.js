// routes/candidate.routes.js
const express = require("express");
const candidateController = require("../controllers/candidate.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/candidates", authenticate, candidateController.createCandidate);
router.get("/candidates", authenticate, candidateController.getCandidates);
router.patch(
  "/candidates/:id",
  authenticate,
  candidateController.updateCandidate
);
router.delete(
  "/candidates/:id",
  authenticate,
  candidateController.deleteCandidate
);

module.exports = router;
