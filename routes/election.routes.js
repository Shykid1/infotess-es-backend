// routes/election.routes.js
const express = require("express");
const electionController = require("../controllers/election.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/elections", authenticate, electionController.createElection);
router.get("/elections", authenticate, electionController.getElections);
router.patch("/elections/:id", authenticate, electionController.updateElection);
router.delete(
  "/elections/:id",
  authenticate,
  electionController.deleteElection
);

module.exports = router;
