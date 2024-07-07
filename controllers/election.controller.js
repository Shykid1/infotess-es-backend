// controllers/election.controller.js
const Election = require("../models/election.model");

exports.createElection = async (req, res) => {
  try {
    const election = new Election(req.body);
    await election.save();
    res.status(201).send(election);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getElections = async (req, res) => {
  try {
    const elections = await Election.find({});
    res.status(200).send(elections);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateElection = async (req, res) => {
  try {
    const election = await Election.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!election) {
      return res.status(404).send();
    }
    res.send(election);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteElection = async (req, res) => {
  try {
    const election = await Election.findByIdAndDelete(req.params.id);
    if (!election) {
      return res.status(404).send();
    }
    res.send(election);
  } catch (error) {
    res.status(500).send(error);
  }
};
