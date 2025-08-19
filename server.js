const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Usage = require("./models/WebsiteUsage");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/track", async (req, res) => {
  const { domain, timeSpent } = req.body;
  const today = new Date().toDateString();
  let usage = await Usage.findOne({ domain, date: today });

  if (usage) {
    usage.timeSpent += timeSpent;
  } else {
    usage = new Usage({ domain, timeSpent, date: today });
  }

  await usage.save();
  res.sendStatus(200);
});

const path = require("path");

// Serve static dashboard folder
app.use("/dashboard", express.static(path.join(__dirname, "../dashboard")));


app.get("/api/usage", async (req, res) => {
  const data = await Usage.find();
  res.json(data);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
