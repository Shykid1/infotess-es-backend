const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.model");

dotenv.config();

const protect = async (req, res, next) => {
  let token;

  if (
    req.hearders.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from headers
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user with id and attach request object
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
};

const verifyToken = (req, res, next) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Admin Middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, verifyToken, admin };
