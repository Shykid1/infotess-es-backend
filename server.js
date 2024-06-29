const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbConnect = require("./utils/dbConnect");

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
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/user", require("./routes/user.routes"));
app.use("/api/v1/candidate", require("./routes/candidate.routes"));
app.use("/api/v1/election", require("./routes/election.routes"));
app.use("/api/v1/vote", require("./routes/vote.routes"));

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
