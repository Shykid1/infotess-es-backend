const Election = require("../models/election.model");

// Create Election

exports.createElection = async (req, res) => {
  try {
    const { image, title, description, startDate, endDate, admin } = req.body;

    // Check if Election already exists
    const electionExists = await Election.findOne({ title });
    if (electionExists)
      return res.status(400).json({ error: "Election already exists" });

    const election = new Election({
      image,
      title,
      description,
      startDate,
      endDate,
      admin,
    });
    await election.save();
    res
      .status(201)
      .json({ message: "Election created successfully", election });
  } catch (error) {
    res.status(400).json({ error: "Failed creating Election" });
  }
};

// Get All Elections
exports.getAllElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.status(200).json({ elections });
  } catch (error) {
    res.status(400).json({ error: "Failed fetching Elections" });
  }
};

// Get Election by ID
exports.getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    res.status(200).json({ election });
  } catch (error) {
    res.status(400).json({ error: "Failed fetching Election" });
  }
};

// Update Election
exports.updateElection = async (req, res) => {
  try {
    const { image, title, description, startDate, endDate, admin } = req.body;

    const election = await Election.findByIdAndUpdate(
      req.params.id,
      { image, title, description, startDate, endDate, admin },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Election updated successfully", election });
  } catch (error) {
    res.status(400).json({ error: "Failed updating Election" });
  }
};

// Delete Election
exports.deleteElection = async (req, res) => {
  try {
    await Election.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Election deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed deleting Election" });
  }
};
