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

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
