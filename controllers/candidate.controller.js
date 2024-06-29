const Candidate = require("../models/candidate.model");

// Create a new Candidate
exports.createCandidate = async (req, res) => {
  try {
    const { image, name, portfolio, electionId, candidateId } = req.body;

    // Check if the candidate is already registered
    const candidate = await Candidate.findOne({ candidateId });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Candidate with the same name already exists" });
    }

    // Create a new Candidate
    const newCandidate = await Candidate.create({
      image,
      name,
      portfolio,
      candidateId,
      electionId,
    });

    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ error: "Failed to create candidate" });
  }
};

// Get all Candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Failed to get candidates" });
  }
};

// Get a Candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ error: "Failed to get candidate" });
  }
};

// Update a Candidate
exports.updateCandidate = async (req, res) => {
  try {
    const { image, name, portfolio, candidateId } = req.body;

    // Check if the candidate exists
    let candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Update the candidate
    candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { image, name, portfolio, candidateId },
      { new: true }
    );

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ error: "Failed to update candidate" });
  }
};

// Delete a Candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete candidate" });
  }
};
