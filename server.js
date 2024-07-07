const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbConnect = require("./utils/dbConnect");

const adminRoutes = require("./routes/admin.routes");
const candidateRoutes = require("./routes/candidate.routes");
const electionRoutes = require("./routes/election.routes");
const voterRoutes = require("./routes/voter.routes");
const userRoutes = require("./routes/user.routes");
const voteRoutes = require("./routes/vote.routes");

dotenv.config();

// Connect to MongoDB
dbConnect();

const port = process.env.PORT || 3000;

//initializa app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api", adminRoutes);
app.use("/api", candidateRoutes);
app.use("/api", electionRoutes);
app.use("/api", voterRoutes);
app.use("/api", userRoutes);
app.use("/api", voteRoutes);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
