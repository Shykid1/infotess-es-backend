// routes/voter.routes.js
const express = require("express");
const voterController = require("../controllers/voter.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/voters", authenticate, voterController.createVoter);
router.get("/voters", authenticate, voterController.getVoters);
router.patch("/voters/:id", authenticate, voterController.updateVoter);
router.delete("/voters/:id", authenticate, voterController.deleteVoter);

module.exports = router;
