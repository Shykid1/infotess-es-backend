// controllers/admin.controller.js
const Admin = require("../models/admin.model");

exports.createAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).send(admins);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!admin) {
      return res.status(404).send();
    }
    res.send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).send();
    }
    res.send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
};
