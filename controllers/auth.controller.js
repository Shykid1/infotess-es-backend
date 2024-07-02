const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const middleware = require("../middlewares/auth.middleware");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const SuperAdmin = require("../models/superadmin.model");
const Voter = require("../models/voter.model");

dotenv.config();

// Create a new SuperAdmin
exports.createSuperAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if role is super
    if (role !== "Super") {
      return res.status(400).json({ message: "Pease specify role to super" });
    }

    // Check if the user is already registered
    const user = await SuperAdmin.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    // Store Super Admin details
    const superAdmin = await SuperAdmin.create({
      name,
      userId: newUser._id,
    });

    res.status(201).json(superAdmin);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Create a new Admin
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if role is admin
    if (role !== "Admin") {
      return res.status(400).json({ message: "Pease specify role to Admin" });
    }

    // Check if the user is already registered
    const user = await Admin.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    // Store Admin details
    const admin = await Admin.create({
      name,
      userId: newUser._id,
    });

    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Admin" });
  }
};

// Create a new Voter
exports.createVoter = async (req, res) => {
  try {
    const { name, email, password, role, studentId } = req.body;

    // Check if role is voter
    if (role !== "Voter") {
      return res.status(400).json({ message: "Pease specify role to Voter" });
    }

    // Check if the user is already registered
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    // Store Voter details
    const voter = await Voter.create({
      name,
      studentId,
      userId: newUser._id,
      isVoted: false,
    });

    res.status(201).json(voter);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Something" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user is registered
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

// Voter login
exports.voterLogin = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    // Check if voter with studentId is a user
    const voter = await Voter.findOne({ studentId }).populate("userId").exec();

    if (!voter) {
      return res.status(400).json({ message: "Voter not found" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, voter.userId.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: voter._id }, process.env.JWT_SECRET, {
      expiresIn: 300,
    });

    res.status(200).json({ token, voter });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users" });
  }
};

// Get user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
};

// Update user by id
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete user by id
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Get Super Admins
exports.getSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmin.find();
    res.status(200).json(superAdmins);
  } catch (error) {
    res.status(500).json({ error: "Failed to get super admins" });
  }
};

// Get Super Admin by id
exports.getSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findById(req.params.id);
    res.status(200).json(superAdmin);
  } catch (error) {
    res.status(500).json({ error: "Failed to get super admin" });
  }
};

// Update Super Admin by id
exports.updateSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(superAdmin);
  } catch (error) {
    res.status(500).json({ error: "Failed to update super admin" });
  }
};

// Delete Super Admin by id
exports.deleteSuperAdmin = async (req, res) => {
  try {
    await SuperAdmin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Super Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete super admin" });
  }
};

// Get Admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Failed to get admins" });
  }
};

// Get Admin by id
exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Failed to get admin" });
  }
};

// Update Admin by id
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Failed to update admin" });
  }
};

// Delete Admin by id
exports.deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete admin" });
  }
};

// Get Voters
exports.getVoters = async (req, res) => {
  try {
    const voters = await Voter.find();
    res.status(200).json(voters);
  } catch (error) {
    res.status(500).json({ error: "Failed to get voters" });
  }
};

// Get Voter by id
exports.getVoter = async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id);
    res.status(200).json(voter);
  } catch (error) {
    res.status(500).json({ error: "Failed to get voter" });
  }
};

// Update Voter by id
exports.updateVoter = async (req, res) => {
  try {
    const voter = await Voter.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(voter);
  } catch (error) {
    res.status(500).json({ error: "Failed to update voter" });
  }
};

// Delete Voter by id
exports.deleteVoter = async (req, res) => {
  try {
    await Voter.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Voter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete voter" });
  }
};
