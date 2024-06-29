const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Candidate =
  mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
