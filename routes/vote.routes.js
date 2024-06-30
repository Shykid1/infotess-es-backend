const voteRouter = require("express").Router();
const { protect, voter } = require("../middlewares/auth.middleware");
const { vote } = require("../controllers/vote.controller");

// Create a new Vote
voteRouter.post("/", protect, voter, vote);

module.exports = voteRouter;
