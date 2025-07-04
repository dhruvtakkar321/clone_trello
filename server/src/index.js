require("dotenv").config();
const express = require("express"); // ✅ You missed this
const path = require("path");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Serve React frontend after backend APIs
const __dirnamePath = path.resolve();
app.use(express.static(path.join(__dirnamePath, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnamePath, "../client/build/index.html"));
});

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
