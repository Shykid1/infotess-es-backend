const Voter = require("../models/voter.model");
const Candidate = require("../models/candidate.model");

// Vote for a Candidate
exports.vote = async (req, res) => {
  try {
    const { studentId, candidateId } = req.body;

    // Check if the voter exists
    let voter = await Voter.findOne(studentId);
    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    // Check if the candidate exists
    let candidate = await Candidate.findOne(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Check if the voter has already voted
    if (voter.isVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    // Update the votes count
    candidate.votes += 1;
    await candidate.save();

    // Update the voter's voted status
    voter.isVoted = true;
    await voter.save();

    res.status(200).json({ message: "Voted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to vote" });
  }
};
