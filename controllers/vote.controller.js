// controllers/vote.controller.js
const Voter = require("../models/voter.model");
const Candidate = require("../models/candidate.model");
const Election = require("../models/election.model");

exports.vote = async (req, res) => {
  const { studentId, candidateId } = req.body;

  try {
    const voter = await Voter.findOne({ studentId });
    if (!voter) {
      return res.status(404).send({ error: "Voter not found" });
    }

    if (voter.isVoted) {
      return res.status(400).send({ error: "Voter has already voted" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).send({ error: "Candidate not found" });
    }

    const election = await Election.findById(candidate.electionId);
    if (!election) {
      return res.status(404).send({ error: "Election not found" });
    }

    // Ensure election is active
    if (election.status !== "active") {
      return res.status(400).send({ error: "Election is not active" });
    }

    // Update vote count for the candidate
    candidate.votes += 1;
    await candidate.save();

    // Update total vote count for the election
    election.totalVotes += 1;
    await election.save();

    // Mark the voter as having voted
    voter.isVoted = true;
    await voter.save();

    res.status(200).send({ message: "Vote successfully recorded" });
  } catch (error) {
    res.status(500).send(error);
  }
};
