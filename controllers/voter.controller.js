// controllers/voter.controller.js
const Voter = require("../models/voter.model");

exports.createVoter = async (req, res) => {
  try {
    const voter = new Voter(req.body);
    await voter.save();
    res.status(201).send(voter);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getVoters = async (req, res) => {
  try {
    const voters = await Voter.find({});
    res.status(200).send(voters);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateVoter = async (req, res) => {
  try {
    const voter = await Voter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!voter) {
      return res.status(404).send();
    }
    res.send(voter);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteVoter = async (req, res) => {
  try {
    const voter = await Voter.findByIdAndDelete(req.params.id);
    if (!voter) {
      return res.status(404).send();
    }
    res.send(voter);
  } catch (error) {
    res.status(500).send(error);
  }
};
