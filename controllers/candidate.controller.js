// controllers/candidate.controller.js
const Candidate = require("../models/candidate.model");

exports.createCandidate = async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).send(candidate);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.status(200).send(candidates);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!candidate) {
      return res.status(404).send();
    }
    res.send(candidate);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).send();
    }
    res.send(candidate);
  } catch (error) {
    res.status(500).send(error);
  }
};
